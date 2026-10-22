# Project Progress

This file records observed progress and verification evidence. Plans and intended behavior do not count as completed implementation.

## Milestone summary

| Milestone | Status | Evidence | Blockers |
|---|---|---|---|
| Preparation | Complete | Project guidance, brief, roadmap, architecture, decisions, environment template, and milestone plans created on 2026-10-22 | None |
| 0 — Foundation and UI | Complete | Substeps 0.1–0.5 verified; file picker and drag-and-drop manually confirmed; user review completed on 2026-10-22 | None |
| 1 — Upload and storage | Not started | None | Explicit user approval to begin Milestone 1 |
| 2 — AI extraction | Not started | None | Milestone 1 and provider decision |
| 3 — Validation and duplicates | Not started | None | Milestone 2 |
| 4 — Review dashboard | Not started | None | Milestone 3 |
| 5 — PO matching and archive | Not started | None | Milestone 4 |
| 6 — Gmail and notifications | Not started | None | Stable Core MVP and separate approval |
| 7 — RAG assistant | Not started | None | Approved-document archive and separate approval |
| 8 — QA and portfolio | Not started | None | Agreed feature scope complete |

## Activity log

### 2026-10-22 — Project preparation

- **Status:** Preparation complete; implementation not started.
- **Changes:** Created the repository-level project and workflow documentation.
- **Verification:** Confirmed all planned preparation and Milestone 0–8 files exist; `git diff --check` passed; `.env.example` was inspected and contains placeholders only; Git reports only the expected new project files.
- **External actions:** None. No dependencies installed, accounts connected, messages sent, deployment performed, or paid services enabled.
- **Next gate:** User reviews preparation files and explicitly authorizes Milestone 0 or its first substep.

### 2026-10-22 — Milestone 0.1 foundation

- **Status:** Implementation and verification complete; awaiting user review before Milestone 0.2.
- **Changes:** Added a Next.js 16.4.2 App Router foundation, React 19.3.1, strict TypeScript 6.0.3, Tailwind CSS 4.3.3, ESLint 9.39.5, Vitest 5.0.5, a minimal Ukrainian start page, typed locale configuration, one unit test, exact package versions, and documented development commands.
- **Compatibility findings:** TypeScript 7.0.2 was rejected because the installed `typescript-eslint` stack does not support it. ESLint 10.13.0 was rejected because Next.js lint plugins declare support through ESLint 9. Production builds use supported Webpack mode because Turbopack twice failed in the current local execution environment while binding an internal worker port.
- **Verification:** `npm test` passed (1 file, 1 test); `npm run lint` passed; `npm run typecheck` passed; `npm run build` passed with Next.js 16.4.2 in Webpack mode and generated static `/` and `/_not-found` routes; `npm run dev` reached ready state with Turbopack; an HTTP request to `/` returned 200 and contained the expected DocFlow AI foundation text.
- **Dependency audit:** `npm audit --omit=dev --json` reported 0 production vulnerabilities. The full audit reported 5 high-severity development-only findings through `eslint-config-next` -> `fast-glob` -> `micromatch` -> `braces`; npm's offered fix would downgrade `eslint-config-next` to 14.2.35, so no unsafe forced downgrade was applied.
- **External actions:** Read official and installed Next.js 16.4 documentation and npm package metadata. Published the verified source code to the public GitHub repository `Krisdziam/docflow-ai`; no secrets were added, application deployment performed, messages sent, or paid services enabled.
- **Next gate:** User reviews the 0.1 result and explicitly approves Milestone 0.2.

### 2026-10-22 — Milestone 0.2 design system and navigation

- **Status:** Implementation and scoped verification complete; awaiting user review before Milestone 0.3.
- **Changes:** Added semantic typography, color, spacing, radius, shadow, focus, and reduced-motion foundations; typed button, badge, and card components; responsive application shell; desktop sidebar and mobile horizontal navigation; fictional demo profile; accessible skip link; inline SVG navigation icons; typed Ukrainian and English dictionaries; locale-prefixed `/uk` and `/en` routes; and a default redirect from `/` to `/uk`.
- **Scope boundary:** Real upload, processing, storage, document queue, review data, and archive behavior remain unimplemented and are visibly described as prototype or planned functionality.
- **Automated verification:** `npm test` passed (1 file, 3 tests); `npm run lint` passed; `npm run typecheck` passed; `npm run build` passed with Next.js 16.4.2 in Webpack mode and statically generated `/uk` and `/en` routes plus the locale Proxy.
- **Runtime verification:** The existing Turbopack dev server returned `307` from `/` to `/uk`; `/uk` returned Ukrainian content with `<html lang="uk">`; `/en` returned English content with `<html lang="en">`. In the in-app browser's mobile-width viewport, the shell, horizontally scrollable navigation, language switch, translated content, and keyboard-visible skip-link focus were visually observed. A separate desktop-width visual pass was not available in that browser session and remains part of the broader viewport verification planned for substep 0.5.
- **External actions:** None. No accounts connected, messages sent, deployment performed, paid services enabled, commit created, or push performed.
- **Next gate:** User reviews the 0.2 result and explicitly approves Milestone 0.3.

### 2026-10-22 — Milestone 0.3 upload prototype

- **Status:** Implementation complete; automated checks and the available browser checks passed, with one browser-tool limitation recorded below.
- **Changes:** Added a bilingual single-file upload prototype with drag-and-drop and native file-picker entry points; PDF/JPG/PNG guidance; a provisional 10 MB demonstration limit; idle, drag-active, selected, and invalid states; selected-file removal and replacement; visible no-transfer guidance; client-side file metadata validation; and readable file-size formatting. No upload request, API route, persistence, OCR, or server storage was introduced.
- **Security boundary:** Client validation is supplementary UI feedback only. The prototype does not transmit or store file contents. Authoritative content, MIME, extension, size, and filename validation remains a Milestone 1 server responsibility.
- **Automated verification:** `npm test` passed (2 files, 11 tests), including supported types, missing MIME fallback, conflicting MIME rejection, unsupported formats, size limit, and file-size formatting; `npm run lint`, `npm run typecheck`, and `npm run build` passed.
- **Runtime verification:** Ukrainian and English upload headings, guidance, file input, one-file picker mode, and mobile idle layout were observed in the active Next.js development server. The in-app browser opened the native file chooser but did not populate the HTML `FileList` for either a `/tmp` fixture or a workspace fixture; therefore the selected-file and drag-and-drop transitions were not claimed as browser-verified. Both temporary fictional fixtures were removed after the attempt.
- **External actions:** None. No file was transmitted, no account connected, no message sent, no deployment performed, and no commit or push created.
- **Next gate:** User manually checks selecting or dropping one fictional PDF/JPG/PNG, then reviews 0.3 before explicitly approving 0.4.

### 2026-10-22 — GitHub Pages frontend preview

- **Status:** Public frontend preview deployed successfully at `https://krisdziam.github.io/docflow-ai/` after explicit user approval.
- **Changes:** Added Next.js static export and trailing-slash configuration, a Pages-aware base path, a static Ukrainian root redirect, and a GitHub Actions workflow that gates deployment on install, unit tests, lint, typecheck, and build. Added the live URL and frontend-only boundary to `README.md`; updated the GitHub repository description and Homepage field.
- **Architecture boundary:** Removed the runtime locale Proxy because Next.js static export does not support Proxy. The public preview has no API routes, backend, persistence, OCR, or document transmission; root navigation uses a static relative redirect to `/uk/`.
- **Local verification:** A Pages-mode build with `/docflow-ai` generated root, `/uk/`, and `/en/` HTML. A local static server returned the expected redirect and bilingual content, while the generated CSS asset returned HTTP 200.
- **GitHub verification:** Commit `eb8ed8b` was pushed to `origin/main`. GitHub Actions run `39774054805` completed successfully: dependencies, 11 unit tests, lint, typecheck, static build, artifact upload, and deployment all passed. The public root, Ukrainian page, English page, and CSS asset returned HTTP 200 and expected content. The live desktop-width UI was visually inspected with the sidebar, two-column hero, and upload section rendered correctly.
- **Known limitation:** The selected-file and drag-and-drop state still requires the user's manual browser check because the automated in-app file chooser did not populate `FileList` during localhost verification.
- **External actions:** Enabled GitHub Pages with GitHub Actions, pushed the implementation commit, deployed the public preview, and updated repository metadata. No production backend, account integration, paid service, message, or real document upload was introduced.
- **Next gate:** User tests one fictional PDF/JPG/PNG on the public preview and reviews 0.3 before explicitly approving 0.4.

### 2026-10-22 — Milestone 0.4 queue and document prototype

- **Status:** Implementation and scoped verification complete; awaiting user review before Milestone 0.5.
- **Prior gate evidence:** The user manually confirmed the JPG picker selected-state on the GitHub Pages preview. Drag-and-drop was not separately confirmed and remains an explicit 0.5 verification item.
- **Changes:** Added five typed fictional document records; status-based queue filters; processing, needs-review, approved, duplicate, and failed badges; selectable document rows; localized detail panels; and explicit ready, loading, empty, and error demonstration scenarios. Updated the page milestone label and kept review/archive modules visibly planned. No API, storage, persistence, OCR, or backend behavior was introduced.
- **Automated verification:** `npm test` passed (3 files, 15 tests); `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed. The Next.js 16.4.2 Webpack build statically generated `/uk` and `/en`.
- **Runtime verification:** In local desktop Chrome, Ukrainian and English queue content rendered; the approved filter narrowed the queue and changed the details panel; selecting the duplicate record changed its details and review reason; loading, empty, and error scenarios were observed; and the empty-state action restored the queue. An initial `Intl.NumberFormat` difference between Node.js and Chrome caused a hydration mismatch for UAH; deterministic formatting fixed it, and a clean reload showed no Next.js issue badge. The installed Next.js smooth-scroll warning was also resolved with the documented `<html>` attribute.
- **External actions:** None. No commit, push, deployment, account connection, document upload, message, or paid service action was performed.
- **Next gate:** User reviews 0.4 and explicitly approves 0.5 responsive and accessibility verification.

### 2026-10-22 — Milestone 0.5 responsive and accessibility verification

- **Status:** Complete. The user reviewed the result and manually confirmed the remaining drag-and-drop interaction, so Milestone 0 meets its acceptance criteria.
- **Changes:** Updated the visible milestone label to 0.5 and added a focus bridge so keyboard focus on the visually hidden file input produces a clear focus ring on its visible “Choose file” or “Choose another” label. No business logic, backend, upload API, persistence, OCR, or storage was added.
- **Responsive verification:** The local English interface was visually checked in desktop Chrome and at a 390 px responsive width. The mobile header and language switch rendered, the desktop sidebar was replaced by horizontally scrollable navigation, headings wrapped without clipping, and the upload and queue sections stayed within the page width. Queue content and details remain in semantic source order for the stacked mobile layout.
- **Keyboard and semantics verification:** The skip link became visible on `Tab` and moved focus to `#main-content`; the primary action, locale links, navigation, scenario selector, status filters, and document rows were reachable by keyboard; `Enter` on a document row updated the selected record and details. The file input focus defect found during this pass was corrected and rechecked: `#prototype-file` remained the active element while the visible file-picker label displayed a strong blue focus ring. The browser accessibility tree exposed the main landmark, labelled navigation, headings, upload control, status filters, document rows, and definition-list details.
- **Contrast verification:** Representative foreground/background pairs all met WCAG AA for normal text: primary text on white 16.35:1, muted text on white 5.67:1, brand on white 5.99:1, strong brand on soft brand 7.52:1, success on success-soft 5.55:1, warning on warning-soft 6.88:1, red-700 on red-50 5.91:1, and slate-700 on slate-100 9.45:1.
- **Automated verification:** After all code, documentation, and milestone-label updates, `npm test` passed (3 files, 15 tests), `npm run lint` passed, `npm run typecheck` passed, `npm run build` passed with Next.js 16.4.2 in Webpack mode and statically generated `/uk` and `/en`, and `git diff --check` passed.
- **Manual acceptance evidence:** The user dragged the fictional PNG `09-telegram.png` (1.0 MB) into the public prototype and shared a screenshot of the successful selected state. The interface displayed the filename, size, replacement/removal controls, and the notice that the file had not been sent or stored. This closes the previously outstanding drag-and-drop check.
- **Observed environment note:** Chrome DevTools displayed two browser-environment `Permissions-Policy` warnings for `run-ad-auction` and `join-ad-interest-group`; no application runtime error was observed.
- **External actions:** None. No commit, push, deployment, account connection, document upload, message, or paid service action was performed.
- **Next gate:** Milestone 0 is complete. Do not begin Milestone 1 without explicit user approval.

### 2026-10-22 — Milestone 0 release

- **Status:** The completed Milestone 0 source was committed, pushed to `origin/main`, and deployed to the public GitHub Pages preview after explicit user approval.
- **Release evidence:** Commit `2affde5` (`feat: complete milestone 0 UI prototype`) was pushed to `main`. GitHub Actions run `39778938034` completed successfully: dependency installation, 15 unit tests, lint, typecheck, static build, artifact upload, and Pages deployment all passed.
- **Live verification:** The public `/en/` and `/uk/` pages returned HTTP 200 and contained the `Milestone 0.5` label plus the localized document queue. In the live English interface, selecting the `Approved` filter reduced the queue to the single fictional `Orion Logistics Demo` record and updated the details panel to `DN-552`.
- **Workflow note:** GitHub reported non-blocking notices that selected official actions still target the deprecated Node.js 20 action runtime and are currently forced onto Node.js 24, plus the scheduled `ubuntu-latest` migration. The workflow and deployment succeeded; future workflow maintenance should update official action versions when compatible releases are available.
- **External actions:** Committed and pushed the verified Milestone 0 implementation and deployed the static frontend preview. No backend, production account, paid service, message, or real document transmission was introduced.
- **Next gate:** Await explicit user approval before beginning Milestone 1.

### 2026-10-22 — Vercel deployment migration

- **Status:** The completed Milestone 0 frontend is deployed to Vercel at `https://docflow-ai-smoky.vercel.app/`; Milestone 1 remains not started.
- **Changes:** Created the `kennyjones/docflow-ai` Vercel project, linked the local repository metadata, connected the GitHub repository `Krisdziam/docflow-ai` for automatic deployments, added `.vercel/` to `.gitignore`, and made the Vercel URL primary in `README.md`. GitHub Pages remains available as a fallback.
- **Build verification:** Vercel built the project with Next.js 16.4.2, completed TypeScript validation, generated all four static pages, assigned the production alias, and reported the deployment state as `READY`.
- **Automatic deployment verification:** Push-triggered production deployment `dpl_22poUpHpFvDHQhSWLo66PmtPPVGH` completed with status `Ready` and reassigned the production aliases, confirming that the GitHub integration is active.
- **Live verification:** Vercel CLI verification returned HTTP 200 and the title `DocFlow AI`; independent unauthenticated requests to `/`, `/uk/`, and `/en/` each returned HTTP 200. In the live Ukrainian interface, selecting the `Погоджено` filter reduced the queue to `Orion Logistics Demo` and updated the details panel to `DN-552`.
- **Security and scope boundary:** No credentials were committed. The deployment contains only the existing frontend prototype; no backend, API route, storage, OCR, paid service, or real document transmission was introduced.
- **Next gate:** Continue to await explicit user approval before Milestone 1.

### 2026-10-22 — Ukrainian hero copy refinement

- **Status:** Complete.
- **Changes:** Replaced the ambiguous phrase “показує причини уваги” with the user-approved wording “виявляє можливі проблеми” and changed “фінальне рішення за фахівцем” to the more natural “остаточне рішення фахівцю”. English copy and application behavior were not changed.
- **Automated verification:** `npm test` passed (3 files, 15 tests); `npm run lint`, `npm run typecheck`, and `npm run build` passed. The Next.js 16.4.2 Webpack build statically generated `/uk` and `/en`.
- **Live verification:** Automatic Vercel deployment `dpl_FbbEtcm48VewRgv5EjRhMPpMC9jM` completed with status `Ready`. After a fresh reload, the production Ukrainian page displayed the approved sentence verbatim.
- **Next gate:** Continue to await explicit user approval before Milestone 1.

### 2026-10-22 — Zero-cost operating constraint

- **Status:** Accepted as a project-wide requirement.
- **Changes:** Recorded a zero external-service budget in the project brief, roadmap, architecture, and decision log. Only free plans, free quotas, local tools, and mock adapters are allowed; automatically chargeable resources are prohibited, and exhausted quotas must fail visibly or use a documented fallback.
- **Verification:** `git diff --check` passed after the documentation update. No service, billing method, paid plan, or external resource was enabled.
- **Next gate:** Before Milestone 1 storage is connected, verify the current official free-plan terms and limits of the selected provider.
