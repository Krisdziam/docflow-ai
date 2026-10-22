# Milestone 2 — AI/OCR Extraction Pipeline

**Status:** Not started

## Objective

Process stored documents asynchronously and produce versioned, schema-validated structured extraction results with explicit failure handling.

## In scope

- Provider comparison on a small fictional fixture set and documented selection.
- Provider-neutral extraction adapter.
- n8n ingestion webhook and authenticated callbacks.
- Classification into invoice, purchase order, delivery note, or unknown.
- Versioned schemas for headers and line items.
- Bounded retries, timeout handling, correlation IDs, and failed execution path.
- Review signals and provider metadata without false accuracy claims.
- Tests for successful, unknown, malformed-output, timeout, and failed cases.

## Non-goals

- Deterministic business validation beyond schema requirements.
- Final duplicate policy and PO matching.
- Human editing and approval.

## Acceptance criteria

- Each supported fixture returns schema-valid structured data or an explicit failure/unknown result.
- Free-form or malformed provider output is rejected.
- Reprocessing is traceable and does not silently overwrite prior extraction evidence.
- Retry and failure paths are observed and documented.

## Stop condition

Stop after extraction evidence and user review. Do not start business-rule implementation.
