# Milestone 6 — Gmail Intake and Notifications

**Status:** Not started; optional extension

## Objective

Add a controlled test inbox channel and useful review/failure summaries without sending unintended external communications.

## Preconditions

- Stable Core MVP.
- Explicit user approval for each connected account and outbound channel.
- Test-only addresses, labels, and recipients.

## In scope

- Test Gmail label or inbox ingestion.
- Attachment validation through the same trusted upload boundary.
- Idempotent handling of repeated message delivery.
- Review-needed alert, failure alert, and daily summary.
- Dry-run or preview mode before real test sending.

## Non-goals

- Unapproved production inbox access.
- Real customer recipients.
- Automated sending of financial documents.

## Acceptance criteria

- Approved test attachments enter the same processing pipeline without duplication.
- Notification content excludes secrets and unnecessary document data.
- No external message is sent without the separately approved test configuration.

## Stop condition

Stop after controlled integration evidence and account cleanup instructions are reviewed.
