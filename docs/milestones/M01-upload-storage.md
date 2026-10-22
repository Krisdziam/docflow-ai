# Milestone 1 — Secure Upload and Storage

**Status:** In progress — substep 1.1 implemented, deployed, and verified; awaiting user review

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

Not part of 1.1: browser-to-API wiring, database records, private object storage, idempotency enforcement, queue state, progress UI, retries, duplicates, OCR, or AI.

### 1.2 and later

Not approved or started. The next bounded substep must be proposed from the remaining Milestone 1 scope and requires explicit user approval. Any hosted storage/database option must first be checked against the zero-cost rule and current official free-plan limits.

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
