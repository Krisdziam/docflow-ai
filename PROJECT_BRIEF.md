# DocFlow AI — Project Brief

## Product statement

DocFlow AI is a bilingual, human-in-the-loop web application that converts invoices, purchase orders, and delivery notes into validated structured data, detects duplicates and mismatches, and routes uncertain results to a review dashboard.

## Portfolio goal

Create an evidence-backed portfolio case for AI Automation, Integration Engineer, n8n, and junior full-stack roles. The project must demonstrate real workflows and measured results rather than unsupported marketing claims.

## Demonstration client

A fictional wholesale company or distributor receives business documents by file upload and, later, through a test Gmail label. Employees currently copy data into spreadsheets or internal tools manually.

## Problems addressed

- Manual data entry and avoidable errors.
- Duplicate documents.
- Inconsistent invoice and purchase-order data.
- Missed due dates and unclear review status.
- Poor traceability of corrections and decisions.

## Core users

- **Operations specialist:** uploads documents, reviews extraction, corrects fields, approves or rejects.
- **Operations manager:** monitors volume, failures, mismatches, and overdue items.
- **Administrator:** manages integrations and rules and reviews processing history.

The first release may use one simplified demo role, but the data model must not prevent future role separation.

## Core MVP scope

The Core MVP includes Milestones 0–5:

- Responsive Ukrainian/English web interface.
- Browser upload of PDF, JPG, and PNG files from a computer or phone.
- Secure validation, hashing, storage, document IDs, and correlation IDs.
- Classification of invoice, purchase order, delivery note, and unknown documents.
- OCR/vision extraction into schema-validated structured data.
- Deterministic business validation and review reasons.
- Duplicate detection and idempotent processing.
- Human review, correction, approval, rejection, comments, and audit history.
- Invoice-to-PO comparison and visible mismatches.

## Extended scope

- Milestone 6: Gmail intake and notifications.
- Milestone 7: RAG over approved documents with source references.
- Milestone 8: final QA, measurable results, and portfolio delivery.

Extended scope starts only after the Core MVP is stable.

## Document types

1. Invoice.
2. Purchase order.
3. Delivery note.

Supported inputs: digital PDF, scan, and moderately imperfect document photo. All demonstration content must be fictional.

## Automation boundary

- AI reads and proposes structured data.
- Schemas and deterministic rules validate the proposal.
- A human makes the final approve or reject decision.
- The system never makes payments.
- The system never sends financial documents externally without explicit confirmation.

## Success indicators

Metrics must be calculated from the final fictional fixture set:

- Documents processed.
- Required-field extraction accuracy.
- Duplicates detected.
- Validation issues found.
- Review rate.
- Processing duration.
- Approve/reject outcomes.
- Tested failure-path behavior.

## Non-goals for the initial implementation

- Production accounting or ERP replacement.
- Automated payments.
- Production-grade multi-tenant billing.
- Fully calibrated probabilistic confidence guarantees.
- Supporting every document type or language.
- Unsupervised outbound communication.
- Infrastructure added only for visual complexity.

## Product principles

- Human control is a feature, not a failure of automation.
- Confidence is a review signal, not a promise of correctness.
- Every important status change is auditable.
- Errors must be visible, explainable, and recoverable.
- The UI should resemble a restrained operations/finance SaaS product.
