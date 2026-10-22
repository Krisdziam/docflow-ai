# DocFlow AI

AI-assisted document processing and approval system for invoices, purchase orders, and delivery notes.

**Live UI prototype:** [https://krisdziam.github.io/docflow-ai/](https://krisdziam.github.io/docflow-ai/)

## Current status

Project preparation is complete. Milestone 0 is in progress: substeps 0.1–0.2 are verified, and the Milestone 0.3 upload prototype is implemented with automated checks and a manual file-selection check pending.

## Current foundation

- Next.js 16.4.2 with the App Router and React 19.3.1.
- TypeScript 6.0.3 in strict mode.
- Tailwind CSS 4.3.3.
- ESLint 9.39.5 with the Next.js rules.
- Vitest 5.0.5.

## Planned later stack

- Zod validation.
- Supabase PostgreSQL and Storage.
- n8n workflow automation.
- OpenAI Vision or Gemini behind a provider adapter; final provider selection is pending.
- Playwright for critical end-to-end flows.

Next.js implementation follows the documentation bundled with the installed version under `node_modules/next/dist/docs/`.

## How documents enter the system

The primary Core MVP flow is browser upload:

1. A user opens the DocFlow AI website.
2. The user drags a PDF/JPG/PNG into the upload area or selects it from a computer or phone.
3. The server validates and stores the original file.
4. The document enters the processing pipeline.
5. The result appears in the review queue.

Gmail intake is a later extension. Users do not upload operational documents into Git, the source-code folder, or a chat.

## Project documentation

- [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) — product purpose and scope.
- [`ROADMAP.md`](ROADMAP.md) — milestones and sequencing.
- [`AGENTS.md`](AGENTS.md) — permanent working rules.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — proposed system architecture and data model.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — material project decisions.
- [`docs/PROGRESS.md`](docs/PROGRESS.md) — evidence-backed implementation status.
- [`docs/milestones/`](docs/milestones/) — bounded milestone plans.

## Environment variables

Copy `.env.example` to `.env.local` only after application setup. Never commit real credentials. External integrations remain disabled until separately approved.

## Development commands

Requires Node.js 20.9 or newer. The foundation was verified with Node.js 26.8.2 and npm 11.19.1.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/uk` after the development server starts. The English prototype is available at `http://localhost:3000/en`.

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

The production build explicitly uses Next.js's supported Webpack mode because the current local execution environment causes Turbopack's production build to fail while binding an internal worker port. Development still uses the default Turbopack server.

## GitHub Pages preview

Pushes to `main` run unit tests, lint, typecheck, and a static Next.js build before deploying the `out` artifact to GitHub Pages. The public preview is intentionally frontend-only: selected files remain in the browser and are not uploaded or stored. Real server validation and private storage belong to Milestone 1.
