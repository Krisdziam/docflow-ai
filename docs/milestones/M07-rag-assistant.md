# Milestone 7 — RAG Assistant

**Status:** Not started; optional extension

## Objective

Answer bounded questions using only approved documents and provide verifiable source references or an insufficient-evidence response.

## Preconditions

- Stable approved-document archive.
- Explicit user approval for embedding generation and any associated cost.
- Defined evaluation questions and expected evidence.

## In scope

- Chunking and embeddings for approved documents only.
- PostgreSQL with pgvector retrieval.
- Document and, where feasible, page references.
- Retrieval validation and insufficient-evidence behavior.
- Prompt-injection fixtures treated strictly as document data.
- Tests for supported, unsupported, ambiguous, and malicious-content cases.

## Non-goals

- General-purpose chatbot.
- Answers from unapproved or external documents.
- Claims without retrieved evidence.

## Acceptance criteria

- Answers cite the source documents used.
- The assistant refuses when approved evidence is insufficient.
- Unapproved documents and embedded instructions cannot control the assistant.
- Evaluation results are measured and recorded.

## Stop condition

Stop after evidence-backed evaluation and security review.
