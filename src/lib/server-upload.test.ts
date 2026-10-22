import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { maxUploadBytes } from "@/lib/upload-policy";
import {
  createSafeDisplayName,
  UploadValidationError,
  validateServerUpload,
} from "@/lib/server-upload";

const fixtures = [
  {
    bytes: new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]),
    mimeType: "application/pdf",
    name: "invoice.pdf",
  },
  {
    bytes: new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]),
    mimeType: "image/jpeg",
    name: "delivery-note.jpg",
  },
  {
    bytes: new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00,
    ]),
    mimeType: "image/png",
    name: "purchase-order.png",
  },
] as const;

describe("server upload validation", () => {
  it.each(fixtures)("validates $mimeType content", async (fixture) => {
    const file = new File([fixture.bytes], fixture.name, {
      type: fixture.mimeType,
    });

    await expect(validateServerUpload(file)).resolves.toEqual({
      displayName: fixture.name,
      mimeType: fixture.mimeType,
      sha256: createHash("sha256").update(fixture.bytes).digest("hex"),
      sizeBytes: fixture.bytes.length,
    });
  });

  it("accepts a missing browser MIME type when extension and content agree", async () => {
    const fixture = fixtures[0];
    const file = new File([fixture.bytes], "mobile-scan.pdf");

    await expect(validateServerUpload(file)).resolves.toMatchObject({
      mimeType: "application/pdf",
    });
  });

  it("rejects empty files before reading their content", async () => {
    const file = new File([], "empty.pdf", { type: "application/pdf" });

    await expect(validateServerUpload(file)).rejects.toMatchObject({
      code: "EMPTY_FILE",
    });
  });

  it("rejects files above the 10 MB limit", async () => {
    const file = new File([new Uint8Array(maxUploadBytes + 1)], "large.pdf", {
      type: "application/pdf",
    });

    await expect(validateServerUpload(file)).rejects.toMatchObject({
      code: "FILE_TOO_LARGE",
    });
  });

  it("rejects an unsupported extension", async () => {
    const file = new File([fixtures[0].bytes], "invoice.txt", {
      type: "text/plain",
    });

    await expect(validateServerUpload(file)).rejects.toMatchObject({
      code: "UNSUPPORTED_FILE_TYPE",
    });
  });

  it("rejects conflicting declared MIME metadata", async () => {
    const file = new File([fixtures[0].bytes], "invoice.pdf", {
      type: "image/png",
    });

    await expect(validateServerUpload(file)).rejects.toMatchObject({
      code: "FILE_TYPE_MISMATCH",
    });
  });

  it("rejects content whose signature does not match the extension", async () => {
    const file = new File([fixtures[2].bytes], "renamed.pdf", {
      type: "application/pdf",
    });

    await expect(validateServerUpload(file)).rejects.toMatchObject({
      code: "FILE_TYPE_MISMATCH",
    });
  });

  it("rejects unknown content even when metadata looks supported", async () => {
    const file = new File(["not really a pdf"], "fake.pdf", {
      type: "application/pdf",
    });

    await expect(validateServerUpload(file)).rejects.toBeInstanceOf(
      UploadValidationError,
    );
    await expect(validateServerUpload(file)).rejects.toMatchObject({
      code: "UNSUPPORTED_FILE_TYPE",
    });
  });
});

describe("safe display filenames", () => {
  it("removes path segments and control characters", () => {
    expect(createSafeDisplayName("../private/\u0000 invoice.pdf")).toBe(
      "invoice.pdf",
    );
    expect(createSafeDisplayName("C:\\fakepath\\scan.png")).toBe("scan.png");
  });

  it("keeps long names bounded while preserving the supported extension", () => {
    const displayName = createSafeDisplayName(`${"a".repeat(150)}.jpeg`);

    expect(displayName).toHaveLength(120);
    expect(displayName.endsWith(".jpeg")).toBe(true);
  });
});
