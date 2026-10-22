import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const fixtureDirectory = join(
  projectRoot,
  "test-fixtures",
  "upload-api",
  "files",
);
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const expectedStatusByFilename = new Map([
  ["01-valid-invoice.pdf", 201],
  ["02-valid-purchase-order.pdf", 201],
  ["03-valid-delivery-note.jpg", 201],
  ["04-valid-document-photo.png", 201],
  ["05-valid-mobile-scan.jpeg", 201],
  ["06-invalid-empty.pdf", 400],
  ["07-invalid-fake-pdf.pdf", 415],
  ["08-invalid-png-renamed.pdf", 415],
  ["09-invalid-unsupported.txt", 415],
  ["10-invalid-oversized.pdf", 413],
]);

const mimeTypeByExtension = new Map([
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".txt", "text/plain"],
]);

const filenames = (await readdir(fixtureDirectory)).sort();

if (filenames.length !== expectedStatusByFilename.size) {
  throw new Error(
    `Expected ${expectedStatusByFilename.size} fixture files, found ${filenames.length}.`,
  );
}

let failedChecks = 0;

for (const filename of filenames) {
  const expectedStatus = expectedStatusByFilename.get(filename);

  if (!expectedStatus) {
    console.error(`UNEXPECTED ${filename}`);
    failedChecks += 1;
    continue;
  }

  const bytes = await readFile(join(fixtureDirectory, filename));
  const mimeType = mimeTypeByExtension.get(extname(filename).toLowerCase()) ?? "";
  const formData = new FormData();
  formData.append("file", new File([bytes], filename, { type: mimeType }));

  const response = await fetch(`${baseUrl}/api/uploads`, {
    body: formData,
    method: "POST",
  });
  const body = await response.json();
  const passed = response.status === expectedStatus;
  const resultCode = body.error?.code ?? body.data?.status ?? "unknown";

  console.log(
    `${passed ? "PASS" : "FAIL"} ${filename}: ${response.status} ${resultCode}`,
  );

  if (!passed) {
    console.error(`  Expected HTTP ${expectedStatus}.`);
    failedChecks += 1;
  }

  if (response.status === 201 && body.data?.persisted !== false) {
    console.error("  Successful 1.1 responses must report persisted: false.");
    failedChecks += 1;
  }
}

if (failedChecks > 0) {
  process.exitCode = 1;
} else {
  console.log(`All ${filenames.length} upload fixtures behaved as expected.`);
}
