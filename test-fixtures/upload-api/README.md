# Milestone 1.1 upload API test files

This folder contains a reproducible, fictional fixture set for testing `POST /api/uploads`. Generated files live in `files/` and are intentionally ignored by Git because one negative fixture is larger than 10 MB.

Regenerate all ten files from the repository root with the bundled Python runtime:

```bash
/Users/dziamkahome/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/generate-upload-fixtures.py
```

All names, companies, identifiers, dates, and amounts are fictional.

| File | Expected API result | Purpose |
|---|---:|---|
| `01-valid-invoice.pdf` | `201` | Valid PDF invoice |
| `02-valid-purchase-order.pdf` | `201` | Valid PDF purchase order |
| `03-valid-delivery-note.jpg` | `201` | Valid JPEG |
| `04-valid-document-photo.png` | `201` | Valid PNG |
| `05-valid-mobile-scan.jpeg` | `201` | Valid `.jpeg` extension |
| `06-invalid-empty.pdf` | `400 EMPTY_FILE` | Empty upload |
| `07-invalid-fake-pdf.pdf` | `415 UNSUPPORTED_FILE_TYPE` | Text disguised as PDF |
| `08-invalid-png-renamed.pdf` | `415 FILE_TYPE_MISMATCH` | PNG bytes with a PDF extension |
| `09-invalid-unsupported.txt` | `415 UNSUPPORTED_FILE_TYPE` | Unsupported extension |
| `10-invalid-oversized.pdf` | `413 FILE_TOO_LARGE` | One byte above the 10 MB limit |

Test one file against the local API:

```bash
curl --form 'file=@./test-fixtures/upload-api/files/01-valid-invoice.pdf' \
  http://localhost:3000/api/uploads
```

Test the deployed API by replacing the URL:

```bash
curl --form 'file=@./test-fixtures/upload-api/files/01-valid-invoice.pdf' \
  https://docflow-ai-smoky.vercel.app/api/uploads
```

The current website picker does not submit files to the API. Use `curl`, Postman, or another HTTP client for Milestone 1.1 tests. Successful responses must still say `persisted: false` because no storage is connected.

After starting the application, verify all ten files at once:

```bash
node scripts/verify-upload-fixtures.mjs http://localhost:3000
```

The script prints `PASS` for each file and exits with an error if an HTTP status differs from the table above.
