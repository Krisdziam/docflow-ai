import Link from "next/link";

import type { Dictionary } from "@/i18n/dictionaries";
import { supportedLocales, type SupportedLocale } from "@/lib/app-config";

type LanguageSwitcherProps = Readonly<{
  dictionary: Dictionary;
  locale: SupportedLocale;
}>;

const localeLabels: Record<SupportedLocale, string> = {
  uk: "UA",
  en: "EN",
};

export function LanguageSwitcher({
  dictionary,
  locale,
}: LanguageSwitcherProps) {
  return (
    <nav
      aria-label={dictionary.language}
      className="inline-flex rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-1"
    >
      {supportedLocales.map((supportedLocale) => {
        const isActive = supportedLocale === locale;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-9 min-w-10 items-center justify-center rounded-[var(--radius-sm)] px-2 text-xs font-bold transition-colors ${
              isActive
                ? "bg-[var(--color-surface)] text-[var(--color-brand-strong)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
            href={`/${supportedLocale}`}
            hrefLang={supportedLocale}
            key={supportedLocale}
            lang={supportedLocale}
          >
            {localeLabels[supportedLocale]}
          </Link>
        );
      })}
    </nav>
  );
}
