import { describe, expect, it } from "vitest";

import {
  filterPrototypeDocuments,
  prototypeDocuments,
} from "./document-prototype";

describe("document queue prototype", () => {
  it("returns every document for the all filter", () => {
    expect(filterPrototypeDocuments(prototypeDocuments, "all")).toHaveLength(
      prototypeDocuments.length,
    );
  });

  it("filters documents by status", () => {
    const reviewDocuments = filterPrototypeDocuments(
      prototypeDocuments,
      "needs_review",
    );

    expect(reviewDocuments).toHaveLength(1);
    expect(reviewDocuments[0]?.id).toBe("doc-1042");
  });

  it("returns an empty list when a status has no matching documents", () => {
    const withoutApproved = prototypeDocuments.filter(
      (document) => document.status !== "approved",
    );

    expect(filterPrototypeDocuments(withoutApproved, "approved")).toEqual([]);
  });

  it("uses fictional suppliers and stable unique identifiers", () => {
    const ids = prototypeDocuments.map((document) => document.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(prototypeDocuments.every((document) => document.supplier.length > 0)).toBe(
      true,
    );
  });
});
