# Decision Log

Record only material decisions that affect scope, architecture, verification, security, or later milestones. Never store credentials here.

| ID | Date | Status | Decision | Rationale |
|---|---|---|---|---|
| D-001 | 2026-10-22 | Accepted | The source repository, not chat history, is the canonical project context. | Separate milestone chats can safely recover context from versioned files. |
| D-002 | 2026-10-22 | Accepted | Website implementation begins at Milestone 0; project planning documents are a preparation step. | Matches the user's preferred milestone numbering. |
| D-003 | 2026-10-22 | Accepted | Milestones may be divided into decimal substeps such as 0.1 and 0.2. | Keeps work understandable and reviewable without changing the roadmap outcome. |
| D-004 | 2026-10-22 | Accepted | Browser upload is the primary Core MVP intake channel. | It provides a complete demo flow without requiring Gmail or Drive access. |
| D-005 | 2026-10-22 | Accepted | Milestones 0–5 are the Core MVP; Gmail and RAG remain extensions. | Protects the portfolio project from becoming too broad before the central workflow is stable. |
| D-006 | 2026-10-22 | Accepted | Start with a Next.js monolith, Supabase, n8n, shared schemas, and an AI provider adapter. | This is the smallest architecture that demonstrates the required full-stack and automation skills. |
| D-007 | 2026-10-22 | Accepted | Confidence is treated as a review signal, not a guaranteed probability. | Avoids presenting uncalibrated model output as factual accuracy. |
| D-008 | 2026-10-22 | Accepted | The Milestone 0 foundation uses Next.js 16.4.2, React 19.3.1, TypeScript 6.0.3, Tailwind CSS 4.3.3, ESLint 9.39.5, and Vitest 5.0.5 with exact versions in `package.json`. | These were the current stable packages checked during setup; TypeScript 7 and ESLint 10 were rejected after observed parser and peer-dependency incompatibilities. |
| D-009 | 2026-10-22 | Accepted | Production builds use the supported `next build --webpack` mode while development keeps Next.js's default Turbopack mode. | In this local execution environment, two Turbopack production builds failed while binding an internal worker port; the Webpack production build and Turbopack development server both passed. |
| D-010 | 2026-10-22 | Accepted | The bilingual UI uses locale-prefixed routes (`/uk` and `/en`), with `/` redirected to the Ukrainian default. | Server-rendered locale routes keep translated content and the document `lang` attribute aligned without adding a client-side i18n dependency. |
| D-011 | 2026-10-22 | Accepted | Publish the Milestone 0 frontend prototype as a static export at GitHub Pages under `/docflow-ai`; keep real upload and backend behavior out of the public preview. | The user approved a public test surface for browser interaction. Static export preserves the current prototype while avoiding premature server infrastructure or document transmission. |
| D-012 | 2026-10-22 | Accepted | Use Vercel as the primary deployment target for the frontend prototype, connect it to `Krisdziam/docflow-ai`, and retain GitHub Pages as a fallback until separately decommissioned. | Vercel supports the current static Next.js export and provides a direct path to later server capabilities without prematurely starting Milestone 1; keeping Pages avoids an unnecessary destructive cutover. |
| D-013 | 2026-10-22 | Accepted | Keep the learning project at zero external-service spend. Use only free plans, free quotas, local tools, or mock adapters; never enable usage-based billing or an automatically chargeable resource without a future explicit reversal by the user. | The user is not willing to invest additional funds in the educational project. Explicit quota failures and fallbacks are safer than accidental charges. |
| D-014 | 2026-10-22 | Accepted | Milestone 1.1 moves the current application from static export to the Next.js server runtime on Vercel. GitHub Pages remains an archived Milestone 0 snapshot and its deployment workflow is replaced by server-build CI. | A request-dependent POST Route Handler is unsupported by static export. Keeping one current deployment avoids presenting the old static preview as API-capable. |
| D-015 | 2026-10-22 | Accepted | `POST /api/uploads` validates one PDF/JPG/PNG up to 10 MB by extension, optional declared MIME type, and byte signature, then returns SHA-256, UUID v4 document/correlation IDs, and `persisted: false` without writing the file. | This creates a tested trust boundary before database and private storage decisions, while keeping 1.1 zero-cost and reversible. |
| D-016 | 2026-10-22 | Accepted | Do not use a Vercel Function as the final transport for the 10 MB upload flow; keep the 1.1 endpoint as validation evidence and design persistence around a signed direct upload plus server-side finalization. | Vercel's documented Function payload limit is 4.5 MB, so proxying the complete file would contradict the product's 10 MB limit. |

## Pending decisions

| ID | Target milestone | Question | Recommended default |
|---|---|---|---|
| P-002 | 0 | How much authentication should the UI prototype include? | Use a demo user shell; add real authentication only when persistence requires it. |
| P-003 | 1 | Approve a hosted Supabase Free development project for substep 1.2? | Use one free project with a private quarantine bucket, signed resumable uploads, 500 MB database, 1 GB file storage, and explicit quota-failure behavior. |
| P-004 | 2 | First extraction provider? | Compare Gemini's free tier with local Tesseract on the fictional fixture set; keep paid OpenAI API usage disabled. |
| P-005 | 3 | Currency list and financial tolerance? | Start with UAH, EUR, and USD and define a decimal-safe tolerance with tests. |
