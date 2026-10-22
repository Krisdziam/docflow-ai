# Milestone 5 — PO Matching and Approved Archive

**Status:** Not started

## Objective

Compare invoices with purchase orders, explain differences, and preserve approved documents and corrected structured data as an auditable archive.

## In scope

- Purchase-order header and line-item records.
- Supplier, PO number, currency, item, quantity, unit-price, and total comparison.
- `exact match`, `partial match`, `mismatch`, and `PO not found` results.
- Difference-focused UI.
- Approved original file and corrected structured-data linkage.
- At least one verified exact match, partial match, mismatch, and missing-PO fixture.

## Non-goals

- ERP write-back.
- Payment initiation.
- Production Google Drive archive unless separately approved.

## Acceptance criteria

- Matching outcomes and concrete differences are deterministic and tested.
- Approval preserves the original extraction, corrections, actor, and decision time.
- The complete Core MVP flow is demonstrated from upload through review and archive.

## Stop condition

Stop for a Core MVP review before any external intake or RAG extension.
