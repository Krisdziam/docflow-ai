# Milestone 1 — Secure Upload and Storage

**Status:** In progress — substep 1.1 implemented, deployed, verified, and reviewed; substep 1.2 is proposed but not approved

## Objective

Turn the upload prototype into a real browser upload flow that safely validates and stores original documents and creates idempotent document records.

## In scope

- PDF/JPG/PNG upload from desktop and supported mobile browsers.
- Server-side MIME, extension, and size validation.
- Safe display filename, document ID, correlation ID, SHA-256, and idempotency key.
- Private original-file storage and PostgreSQL document record.
- Status transitions through `uploaded` and `queued`.
- Clear progress, error, retry, and duplicate behavior.
- Unit tests and upload API integration tests.

## Approved substeps

### 1.1 — Server upload API and validation

Implemented, deployed, and verified:

- Move the current application from static export to a server-capable Vercel deployment.
- Add the `POST /api/uploads` multipart contract for exactly one file.
- Validate the 10 MB limit, PDF/JPG/PNG extension, optional declared MIME type, and file signature on the server.
- Produce a safe display filename, UUID v4 document ID, UUID v4 correlation ID, and SHA-256.
- Return bounded public errors and explicit `status: "validated"`, `persisted: false` metadata.
- Cover the validation rules with unit tests and the HTTP contract with integration tests.
- Provide a reproducible fictional set of five valid and five invalid upload fixtures with a one-command verification script.
- Show Milestone 1.1 in the bilingual interface while clearly stating that the current picker remains disconnected from the API.

Not part of 1.1: browser-to-API wiring, database records, private object storage, idempotency enforcement, queue state, progress UI, retries, duplicates, OCR, or AI.

### 1.2 and later

Not approved or started. The current proposal is:

- **1.2 — Private storage and document record foundation:** use a free Supabase development project, a private quarantine bucket, signed direct/resumable browser uploads, a minimal `documents` table, server-side post-upload validation and SHA-256, and idempotent finalization. Invalid uploads must be removed from quarantine, and no OCR or AI starts in this substep.
- **1.3 — Real browser upload experience:** connect the existing picker to the approved 1.2 flow, expose progress/retry/error states, and verify desktop/mobile behavior.

The direct-upload design is required if the product keeps its 10 MB limit: Vercel Functions accept at most a 4.5 MB request body, while Supabase recommends resumable TUS uploads for files above 6 MB. The browser must never receive a Supabase service-role secret. Provider creation, credentials, schema implementation, and storage writes still require explicit user approval.

## Non-goals

- OCR or AI extraction.
- Gmail intake.
- Public file URLs.
- Production role system.

## Acceptance criteria

- Valid fictional files are stored privately and linked to one document record.
- Invalid type and oversize cases are rejected server-side with useful messages.
- Repeating the same idempotent request does not create a second canonical record.
- Secrets do not reach browser bundles or logs.
- Focused and broader checks pass and are recorded.

## Stop condition

Stop after user verification of the real upload flow. Do not start extraction.
