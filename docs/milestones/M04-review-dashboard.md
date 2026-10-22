# Milestone 4 — Human Review Dashboard

**Status:** Not started

## Objective

Deliver the human-in-the-loop workspace for finding, inspecting, correcting, approving, rejecting, and retrying documents.

## In scope

- Searchable, filterable, sortable document queue.
- Original-document preview and structured fields.
- Editable fields and line items with server-side validation.
- Validation warnings, review reasons, processing timeline, and audit history.
- Explicit confirmation for approve/reject.
- Comments or decision reasons.
- Difference between AI extraction and corrected values.
- Authorization boundary suitable for the selected demo-user approach.
- Responsive and accessible verification.

## Non-goals

- Full enterprise RBAC.
- Gmail intake, outbound notifications, or RAG.
- Automated approval without a human action.

## Acceptance criteria

- A user can inspect, correct, approve, reject, and retry supported demo cases.
- Invalid corrections are rejected server-side.
- Every material action creates an audit event with actor and time.
- Conflicting or repeated final actions are safely handled.
- Critical user flows pass automated and manual responsive checks.

## Stop condition

Stop after review-flow verification and user sign-off.
