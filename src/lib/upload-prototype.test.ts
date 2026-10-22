import { describe, expect, it } from "vitest";

import {
  formatFileSize,
  prototypeMaxFileBytes,
  validatePrototypeFile,
} from "./upload-prototype";

describe("upload prototype file validation", () => {
  it.each([
    ["invoice.pdf", "application/pdf"],
    ["delivery-note.jpg", "image/jpeg"],
    ["purchase-order.png", "image/png"],
  ])("accepts supported file %s", (name, type) => {
    expect(validatePrototypeFile({ name, size: 1024, type })).toEqual({
      valid: true,
    });
  });

  it("uses a supported extension when a browser omits the MIME type", () => {
    expect(
      validatePrototypeFile({ name: "mobile-scan.JPEG", size: 1024, type: "" }),
    ).toEqual({ valid: true });
  });

  it("rejects unsupported formats", () => {
    expect(
      validatePrototypeFile({
        name: "instructions.docx",
        size: 1024,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }),
    ).toEqual({ valid: false, reason: "unsupported_type" });
  });

  it("rejects a supported extension with a conflicting MIME type", () => {
    expect(
      validatePrototypeFile({
        name: "renamed.pdf",
        size: 1024,
        type: "application/zip",
      }),
    ).toEqual({ valid: false, reason: "unsupported_type" });
  });

  it("rejects files above the prototype limit", () => {
    expect(
      validatePrototypeFile({
        name: "large.pdf",
        size: prototypeMaxFileBytes + 1,
        type: "application/pdf",
      }),
    ).toEqual({ valid: false, reason: "file_too_large" });
  });
});

describe("formatFileSize", () => {
  it("formats bytes, kilobytes, and megabytes", () => {
    expect(formatFileSize(512)).toBe("512 B");
    expect(formatFileSize(1536)).toBe("1.5 KB");
    expect(formatFileSize(2 * 1024 * 1024)).toBe("2.0 MB");
  });
});
