# DocFlow AI — Roadmap

## Working model

Project preparation and architecture documents are created before implementation. Website development begins at Milestone 0. A milestone may be split into decimal substeps when needed; for example, `0.1` repository setup, `0.2` design system, and `0.3` upload prototype.

Each substep ends with an observable result, verification, documentation update, and user review.

## Milestones

| Milestone | Outcome | Dependency |
|---|---|---|
| 0 | Foundation and bilingual UI prototype | Approved project documents |
| 1 | Secure browser upload and storage | Milestone 0 |
| 2 | AI/OCR extraction pipeline | Milestone 1 |
| 3 | Validation and duplicate detection | Milestone 2 |
| 4 | Human review dashboard | Milestone 3 |
| 5 | PO matching and approved archive | Milestone 4 |
| 6 | Gmail intake and notifications | Stable Core MVP |
| 7 | RAG assistant for approved documents | Stable archive and evidence model |
| 8 | QA and portfolio delivery | Selected product scope complete |

## Core MVP release boundary

Milestones 0–5 form the Core MVP. Milestones 6 and 7 are extensions, not prerequisites for demonstrating the primary business flow. Milestone 8 validates whichever scope has actually been completed.

## Global acceptance rules

- Planned behavior is not treated as implemented behavior.
- A milestone cannot be complete without observed verification evidence.
- Failed, skipped, or unavailable checks are recorded.
- Documentation is updated to reflect the implemented architecture.
- No next milestone begins before user review and approval.
- External integrations, paid services, deployment, and outbound messages require separate approval.

## Completion definition

The overall project is complete when the agreed document types pass the demonstrated flow; upload, validated extraction, duplicates, validation warnings, review actions, audit history, and at least one PO match are verified; important error paths and responsive layouts are tested; setup documentation works from a clean environment; no secrets or real personal data are present; and portfolio claims are supported by measured evidence.
