# DocFlow AI

AI-assisted document processing and approval system for invoices, purchase orders, and delivery notes.

**Live UI prototype:** [https://docflow-ai-smoky.vercel.app/](https://docflow-ai-smoky.vercel.app/)

**Archived Milestone 0 static snapshot:** [https://krisdziam.github.io/docflow-ai/](https://krisdziam.github.io/docflow-ai/)

## Current status

Project preparation and Milestone 0 are complete. Milestone 1.1 adds a server-side upload validation API without persistence; database and private object storage remain unimplemented.

## Current foundation

- DocFlow AI application release 0.1.1, showing Milestone 1.1 in the interface.
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
3. The server validates the original file. Storage is introduced in a later approved Milestone 1 substep.
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

## Deployment

Vercel is the primary deployment target and is connected to this GitHub repository for automatic deployments from `main`. The application now uses the Next.js server runtime because `POST /api/uploads` cannot run in a static export. GitHub Pages is an archived Milestone 0 frontend snapshot and is no longer updated by the repository workflow.

The upload API validates files and returns metadata only. It does not yet store file contents or create a database record. The existing browser prototype also remains intentionally disconnected from the API until the real upload flow is introduced in a separately reviewed substep.

## Upload API contract

Send one PDF, JPG, or PNG file of at most 10 MB in a `multipart/form-data` field named `file`:

```bash
curl --form 'file=@./fictional-invoice.pdf' http://localhost:3000/api/uploads
```

A successful `201` response contains a document UUID, correlation UUID, safe display filename, detected MIME type, byte size, SHA-256, `status: "validated"`, and `persisted: false`. Validation failures return a safe error code and message plus the correlation ID. Do not use real documents for testing.

## Fictional upload fixtures

The local [`test-fixtures/upload-api/`](test-fixtures/upload-api/) folder documents ten reproducible test files: five valid PDF/JPG/PNG examples and five expected failures for empty, disguised, mismatched, unsupported, and oversized uploads. Generated binaries live in the ignored `files/` subfolder so the 10 MB negative fixture does not bloat Git history.

```bash
/Users/dziamkahome/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/generate-upload-fixtures.py
node scripts/verify-upload-fixtures.mjs http://localhost:3000
```
