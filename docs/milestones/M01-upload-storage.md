# Milestone 1 — Secure Upload and Storage

**Status:** Not started

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
