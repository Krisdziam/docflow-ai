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

## Pending decisions

| ID | Target milestone | Question | Recommended default |
|---|---|---|---|
| P-002 | 0 | How much authentication should the UI prototype include? | Use a demo user shell; add real authentication only when persistence requires it. |
| P-003 | 1 | Hosted Supabase or another controlled development storage mode? | Hosted Supabase development project, subject to user approval and plan limits. |
| P-004 | 2 | First extraction provider? | Compare OpenAI Vision and Gemini on a small fictional fixture set before locking in. |
| P-005 | 3 | Currency list and financial tolerance? | Start with UAH, EUR, and USD and define a decimal-safe tolerance with tests. |
