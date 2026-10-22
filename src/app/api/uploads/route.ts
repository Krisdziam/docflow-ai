import { randomUUID } from "node:crypto";

import {
  UploadValidationError,
  validateServerUpload,
  type UploadValidationErrorCode,
} from "@/lib/server-upload";

export const runtime = "nodejs";

type RequestErrorCode =
  | "FILE_REQUIRED"
  | "INVALID_MULTIPART"
  | "MULTIPLE_FILES";

type UploadApiErrorCode = RequestErrorCode | UploadValidationErrorCode;

const errorStatusByCode: Readonly<Record<UploadApiErrorCode, number>> = {
  EMPTY_FILE: 400,
  FILE_REQUIRED: 400,
  FILE_TOO_LARGE: 413,
  FILE_TYPE_MISMATCH: 415,
  INVALID_MULTIPART: 400,
  MULTIPLE_FILES: 400,
  UNSUPPORTED_FILE_TYPE: 415,
};

function responseHeaders(correlationId: string): HeadersInit {
  return {
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "x-correlation-id": correlationId,
  };
}

function errorResponse(
  code: UploadApiErrorCode,
  message: string,
  correlationId: string,
): Response {
  return Response.json(
    {
      correlationId,
      error: { code, message },
    },
    {
      headers: responseHeaders(correlationId),
      status: errorStatusByCode[code],
    },
  );
}

export async function POST(request: Request): Promise<Response> {
  const correlationId = randomUUID();
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
    return errorResponse(
      "INVALID_MULTIPART",
      "Send the upload as multipart/form-data.",
      correlationId,
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return errorResponse(
      "INVALID_MULTIPART",
      "The multipart upload could not be read.",
      correlationId,
    );
  }

  const fileValues = formData.getAll("file");

  if (fileValues.length === 0 || !(fileValues[0] instanceof File)) {
    return errorResponse(
      "FILE_REQUIRED",
      'Provide one file in the multipart field named "file".',
      correlationId,
    );
  }

  if (fileValues.length !== 1) {
    return errorResponse(
      "MULTIPLE_FILES",
      "Only one file can be uploaded per request.",
      correlationId,
    );
  }

  try {
    const validatedFile = await validateServerUpload(fileValues[0]);
    const documentId = randomUUID();

    return Response.json(
      {
        correlationId,
        data: {
          documentId,
          file: validatedFile,
          persisted: false,
          status: "validated",
        },
      },
      {
        headers: responseHeaders(correlationId),
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return errorResponse(error.code, error.message, correlationId);
    }

    return Response.json(
      {
        correlationId,
        error: {
          code: "INTERNAL_ERROR",
          message: "The upload could not be validated. Please try again.",
        },
      },
      {
        headers: responseHeaders(correlationId),
        status: 500,
      },
    );
  }
}
