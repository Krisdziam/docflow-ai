import { describe, expect, it } from "vitest";

import { appConfig, supportedLocales } from "./app-config";

describe("appConfig", () => {
  it("keeps the default locale in the supported locale list", () => {
    expect(supportedLocales).toContain(appConfig.defaultLocale);
  });
});
