import { createHash } from "node:crypto";

import {
  getMimeTypeForExtension,
  getUploadExtension,
  maxUploadBytes,
  type SupportedUploadMimeType,
} from "@/lib/upload-policy";

export type UploadValidationErrorCode =
  | "EMPTY_FILE"
  | "FILE_TOO_LARGE"
  | "FILE_TYPE_MISMATCH"
  | "UNSUPPORTED_FILE_TYPE";

export class UploadValidationError extends Error {
  constructor(
    public readonly code: UploadValidationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "UploadValidationError";
  }
}

export type ValidatedUpload = Readonly<{
  displayName: string;
  mimeType: SupportedUploadMimeType;
  sha256: string;
  sizeBytes: number;
}>;

const signatureChecks: ReadonlyArray<
  Readonly<{
    matches: (bytes: Uint8Array) => boolean;
    mimeType: SupportedUploadMimeType;
  }>
> = [
  {
    mimeType: "application/pdf",
    matches: (bytes) =>
      bytes.length >= 5 &&
      bytes[0] === 0x25 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x44 &&
      bytes[3] === 0x46 &&
      bytes[4] === 0x2d,
  },
  {
    mimeType: "image/jpeg",
    matches: (bytes) =>
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff,
  },
  {
    mimeType: "image/png",
    matches: (bytes) =>
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a,
  },
];

function detectMimeType(bytes: Uint8Array): SupportedUploadMimeType | null {
  return signatureChecks.find(({ matches }) => matches(bytes))?.mimeType ?? null;
}

export function createSafeDisplayName(filename: string): string {
  const basename = filename.split(/[\\/]/).at(-1) ?? "document";
  const withoutControlCharacters = basename
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .replace(/\s+/g, " ");
  const fallbackName = withoutControlCharacters || "document";

  if (fallbackName.length <= 120) {
    return fallbackName;
  }

  const extension = getUploadExtension(fallbackName);
  const stemLength = Math.max(1, 120 - extension.length);

  return `${fallbackName.slice(0, stemLength)}${extension}`;
}

export async function validateServerUpload(file: File): Promise<ValidatedUpload> {
  if (file.size === 0) {
    throw new UploadValidationError("EMPTY_FILE", "The uploaded file is empty.");
  }

  if (file.size > maxUploadBytes) {
    throw new UploadValidationError(
      "FILE_TOO_LARGE",
      "The file exceeds the 10 MB upload limit.",
    );
  }

  const extension = getUploadExtension(file.name);
  const extensionMimeType = getMimeTypeForExtension(extension);
  const declaredMimeType = file.type.trim().toLowerCase();

  if (!extensionMimeType) {
    throw new UploadValidationError(
      "UNSUPPORTED_FILE_TYPE",
      "Only PDF, JPG, and PNG files are supported.",
    );
  }

  if (declaredMimeType && declaredMimeType !== extensionMimeType) {
    throw new UploadValidationError(
      "FILE_TYPE_MISMATCH",
      "The filename and declared file type do not match.",
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const detectedMimeType = detectMimeType(bytes);

  if (!detectedMimeType) {
    throw new UploadValidationError(
      "UNSUPPORTED_FILE_TYPE",
      "The file content is not a supported PDF, JPG, or PNG document.",
    );
  }

  if (detectedMimeType !== extensionMimeType) {
    throw new UploadValidationError(
      "FILE_TYPE_MISMATCH",
      "The filename does not match the file content.",
    );
  }

  return {
    displayName: createSafeDisplayName(file.name),
    mimeType: detectedMimeType,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    sizeBytes: file.size,
  };
}
