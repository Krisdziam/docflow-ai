# Milestone 3 — Validation and Duplicate Detection

**Status:** Not started

## Objective

Apply deterministic document and financial rules, store explainable issues, and prevent duplicate canonical records or processing effects.

## In scope

- Required-field, date, currency, number, quantity, subtotal, tax, total, and line-item checks.
- Documented decimal-safe tolerance.
- Exact hash duplicate detection.
- Supplier/document-number identity and supplier/date/total secondary signals.
- Database constraints and workflow idempotency.
- Explainable `needs_review` reasons.
- Unit and integration tests for valid, invalid, duplicate, and concurrent/retry scenarios.

## Non-goals

- Full review editing UI.
- PO line-by-line matching.
- Gmail intake or RAG.

## Acceptance criteria

- Rules produce stored, visible, field-specific issues.
- Arithmetic uses decimal-safe logic and tested tolerance.
- Exact duplicate and repeat-processing cases do not create duplicate canonical records.
- Low-quality or invalid results are routed to review for documented reasons.

## Stop condition

Stop after validation and idempotency evidence is reviewed.
