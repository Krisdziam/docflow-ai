import {
  acceptedUploadExtensions,
  acceptedUploadMimeTypes,
  maxUploadBytes,
} from "@/lib/upload-policy";

export const prototypeMaxFileBytes = maxUploadBytes;

export const acceptedFileTypes = acceptedUploadMimeTypes;

export type PrototypeFile = Readonly<{
  name: string;
  size: number;
  type: string;
}>;

export type FileValidationResult =
  | Readonly<{ valid: true }>
  | Readonly<{ reason: "file_too_large" | "unsupported_type"; valid: false }>;

export function validatePrototypeFile(
  file: PrototypeFile,
): FileValidationResult {
  if (file.size > prototypeMaxFileBytes) {
    return { valid: false, reason: "file_too_large" };
  }

  const normalizedName = file.name.toLowerCase();
  const hasAcceptedType = acceptedFileTypes.some(
    (acceptedType) => acceptedType === file.type,
  );
  const hasAcceptedExtension = acceptedUploadExtensions.some((extension) =>
    normalizedName.endsWith(extension),
  );

  const hasSupportedFormat = file.type
    ? hasAcceptedType && hasAcceptedExtension
    : hasAcceptedExtension;

  if (!hasSupportedFormat) {
    return { valid: false, reason: "unsupported_type" };
  }

  return { valid: true };
}

export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }

  if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}
