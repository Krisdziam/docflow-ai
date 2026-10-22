export const maxUploadBytes = 10 * 1024 * 1024;

export const supportedUploadFormats = [
  {
    extensions: [".pdf"],
    mimeType: "application/pdf",
  },
  {
    extensions: [".jpg", ".jpeg"],
    mimeType: "image/jpeg",
  },
  {
    extensions: [".png"],
    mimeType: "image/png",
  },
] as const;

export type SupportedUploadMimeType =
  (typeof supportedUploadFormats)[number]["mimeType"];

export const acceptedUploadMimeTypes = supportedUploadFormats.map(
  ({ mimeType }) => mimeType,
);

export const acceptedUploadExtensions = supportedUploadFormats.flatMap(
  ({ extensions }) => [...extensions],
);

export function getUploadExtension(filename: string): string {
  const normalizedFilename = filename.trim().toLowerCase();

  return (
    acceptedUploadExtensions.find((extension) =>
      normalizedFilename.endsWith(extension),
    ) ?? ""
  );
}

export function getMimeTypeForExtension(
  extension: string,
): SupportedUploadMimeType | null {
  const format = supportedUploadFormats.find(({ extensions }) =>
    extensions.some((supportedExtension) => supportedExtension === extension),
  );

  return format?.mimeType ?? null;
}
