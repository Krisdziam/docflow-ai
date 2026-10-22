import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/uploads/route";

const pdfBytes = new Uint8Array([
  0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37, 0x0a,
]);

function multipartRequest(entries: ReadonlyArray<readonly [string, File | string]>) {
  const formData = new FormData();

  for (const [key, value] of entries) {
    formData.append(key, value);
  }

  return new Request("http://localhost/api/uploads", {
    body: formData,
    method: "POST",
  });
}

describe("POST /api/uploads", () => {
  it("returns the validated upload contract for a fictional PDF", async () => {
    const file = new File([pdfBytes], "../fixtures/invoice-demo.pdf", {
      type: "application/pdf",
    });
    const response = await POST(multipartRequest([["file", file]]));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-correlation-id")).toBe(body.correlationId);
    expect(body.correlationId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(body.data).toEqual({
      documentId: expect.stringMatching(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      ),
      file: {
        displayName: "invoice-demo.pdf",
        mimeType: "application/pdf",
        sha256: createHash("sha256").update(pdfBytes).digest("hex"),
        sizeBytes: pdfBytes.length,
      },
      persisted: false,
      status: "validated",
    });
  });

  it("rejects a request that is not multipart/form-data", async () => {
    const response = await POST(
      new Request("http://localhost/api/uploads", {
        body: JSON.stringify({ file: "not-a-file" }),
        headers: { "content-type": "application/json" },
        method: "POST",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("INVALID_MULTIPART");
    expect(body.correlationId).toBe(response.headers.get("x-correlation-id"));
  });

  it("requires the multipart field to be named file", async () => {
    const file = new File([pdfBytes], "invoice.pdf", {
      type: "application/pdf",
    });
    const response = await POST(multipartRequest([["document", file]]));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: { code: "FILE_REQUIRED" },
    });
  });

  it("rejects multiple files", async () => {
    const firstFile = new File([pdfBytes], "invoice-a.pdf", {
      type: "application/pdf",
    });
    const secondFile = new File([pdfBytes], "invoice-b.pdf", {
      type: "application/pdf",
    });
    const response = await POST(
      multipartRequest([
        ["file", firstFile],
        ["file", secondFile],
      ]),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: { code: "MULTIPLE_FILES" },
    });
  });

  it("maps unsafe file content to a safe public error", async () => {
    const file = new File(["not a PDF"], "invoice.pdf", {
      type: "application/pdf",
    });
    const response = await POST(multipartRequest([["file", file]]));
    const body = await response.json();

    expect(response.status).toBe(415);
    expect(body).toMatchObject({
      error: {
        code: "UNSUPPORTED_FILE_TYPE",
        message: "The file content is not a supported PDF, JPG, or PNG document.",
      },
    });
    expect(JSON.stringify(body)).not.toContain("not a PDF");
    expect(JSON.stringify(body)).not.toContain("stack");
  });
});
