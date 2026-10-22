export const supportedLocales = ["uk", "en"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const appConfig = {
  name: "DocFlow AI",
  defaultLocale: "uk" satisfies SupportedLocale,
  supportedLocales,
} as const;
