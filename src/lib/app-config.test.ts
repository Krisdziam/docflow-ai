import { describe, expect, it } from "vitest";

import { dictionaries } from "@/i18n/dictionaries";

import {
  appConfig,
  isSupportedLocale,
  supportedLocales,
} from "./app-config";

describe("appConfig", () => {
  it("keeps the default locale in the supported locale list", () => {
    expect(supportedLocales).toContain(appConfig.defaultLocale);
  });

  it("recognizes supported locales and rejects unknown values", () => {
    expect(isSupportedLocale("uk")).toBe(true);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("de")).toBe(false);
    expect(isSupportedLocale("")).toBe(false);
  });

  it("provides a dictionary for every supported locale", () => {
    expect(Object.keys(dictionaries).sort()).toEqual(
      [...supportedLocales].sort(),
    );

    for (const locale of supportedLocales) {
      expect(dictionaries[locale].page.title.length).toBeGreaterThan(0);
      expect(dictionaries[locale].navigation.overview.length).toBeGreaterThan(
        0,
      );
    }
  });
});
