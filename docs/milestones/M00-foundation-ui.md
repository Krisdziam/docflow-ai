# Milestone 0 — Foundation and UI Prototype

**Status:** Complete — substeps 0.1–0.5 verified, user review completed, and file-picker plus drag-and-drop interactions manually confirmed on 2026-10-22

## Objective

Create a runnable Next.js foundation and a responsive bilingual prototype that demonstrates the future document-operations experience using fictional mock data only.

## Recommended substeps

- **0.1 — Repository and application foundation:** initialize the app, inspect installed versions, establish commands, linting, tests, and base folders.
- **0.2 — Design system and navigation:** typography, color tokens, accessible components, language switcher, and application shell.
- **0.3 — Upload prototype:** drag-and-drop/file-picker UI with supported-format guidance and mock states; no real persistence.
- **0.4 — Queue and document prototype:** mock document list, filters, status badges, document details, loading/empty/error states.
- **0.5 — Responsive and accessibility verification:** mobile/desktop checks, keyboard navigation, focus states, contrast, and milestone handoff.

Substeps may be adjusted after the read-only preflight. Complete and review one substep before starting the next when the user requests that pace.

## In scope

- Next.js, TypeScript, and Tailwind setup.
- Ukrainian and English UI structure.
- Responsive application shell and navigation.
- Mock dashboard, upload area, document queue, and document detail view.
- Key loading, empty, success, warning, failure, duplicate, review, approved, and rejected states.
- Accessibility basics.
- Initial component and UI tests appropriate to the implemented scope.
- A static GitHub Pages preview of the frontend prototype, explicitly approved on 2026-10-22.

## Non-goals

- Real upload API or storage.
- Supabase data persistence.
- n8n, OCR, or AI calls.
- Real authentication or role enforcement unless separately approved.
- Gmail, notifications, production/backend deployment, or external communication. The approved GitHub Pages deployment is a frontend-only test preview.

## Acceptance criteria

- The documented local development command starts the application.
- Core prototype pages are usable in Ukrainian and English.
- Upload can be selected or dragged in the UI but is explicitly identified as a prototype until Milestone 1.
- Queue and detail screens show coherent fictional mock data and important states.
- Keyboard navigation and visible focus are verified for primary controls.
- Selected mobile and desktop viewport checks pass.
- Automated checks and their observed results are recorded in `docs/PROGRESS.md`.

## Stop condition

Stop after verified UI prototype delivery and user review. Do not begin real upload or storage work.
