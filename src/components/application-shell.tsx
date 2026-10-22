import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

import {
  ArchiveIcon,
  DocumentsIcon,
  OverviewIcon,
  ReviewIcon,
  SettingsIcon,
} from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/i18n/dictionaries";
import { appConfig, type SupportedLocale } from "@/lib/app-config";

type ApplicationShellProps = Readonly<{
  children: ReactNode;
  dictionary: Dictionary;
  locale: SupportedLocale;
}>;

type NavigationItem = Readonly<{
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  key: keyof Dictionary["navigation"];
}>;

const navigationItems: readonly NavigationItem[] = [
  { href: "", icon: OverviewIcon, key: "overview" },
  { href: "#documents", icon: DocumentsIcon, key: "documents" },
  { href: "#review", icon: ReviewIcon, key: "review" },
  { href: "#archive", icon: ArchiveIcon, key: "archive" },
];

export function ApplicationShell({
  children,
  dictionary,
  locale,
}: ApplicationShellProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <a
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-[var(--radius-md)] bg-[var(--color-brand)] px-4 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        href="#main-content"
      >
        {dictionary.skipToContent}
      </a>

      <aside className="hidden border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-[var(--color-border)] px-6">
          <BrandMark />
          <span className="text-lg font-bold tracking-[-0.02em]">
            {appConfig.name}
          </span>
        </div>

        <Navigation dictionary={dictionary} locale={locale} />

        <div className="mt-auto border-t border-[var(--color-border)] p-4">
          <div className="mb-4 flex items-center justify-between gap-3 px-2">
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              {dictionary.language}
            </span>
            <LanguageSwitcher dictionary={dictionary} locale={locale} />
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] p-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-brand-soft)] text-sm font-bold text-[var(--color-brand-strong)]"
            >
              ОК
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {dictionary.account.user}
              </p>
              <p className="truncate text-xs text-[var(--color-text-muted)]">
                {dictionary.account.role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-white/95 px-4 backdrop-blur sm:px-6 lg:h-20 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <BrandMark />
            <span className="font-bold tracking-[-0.02em]">{appConfig.name}</span>
          </div>
          <p className="hidden text-sm font-medium text-[var(--color-text-muted)] lg:block">
            {dictionary.account.demo}
          </p>
          <div className="lg:hidden">
            <LanguageSwitcher dictionary={dictionary} locale={locale} />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <span className="size-2 rounded-full bg-[var(--color-success)]" />
            <span className="text-sm font-medium text-[var(--color-text-muted)]">
              {dictionary.page.status}
            </span>
          </div>
        </header>

        <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden">
          <Navigation dictionary={dictionary} locale={locale} mobile />
        </div>

        <main id="main-content">{children}</main>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-brand)] text-white shadow-sm"
    >
      <span className="absolute left-2 top-2 h-4 w-3 rounded-sm border border-white/90" />
      <span className="absolute bottom-2 right-2 h-4 w-3 rounded-sm border border-white/60 bg-white/15" />
    </span>
  );
}

function Navigation({
  dictionary,
  locale,
  mobile = false,
}: Readonly<{
  dictionary: Dictionary;
  locale: SupportedLocale;
  mobile?: boolean;
}>) {
  return (
    <nav
      aria-label={dictionary.navigationLabel}
      className={
        mobile ? "scrollbar-hidden overflow-x-auto px-3" : "flex-1 p-4"
      }
    >
      <ul className={mobile ? "flex min-w-max gap-1 py-2" : "space-y-1"}>
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 0;

          return (
            <li key={item.key}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text)]"
                }`}
                href={`/${locale}${item.href}`}
              >
                <Icon className="size-5 shrink-0" />
                <span>{dictionary.navigation[item.key]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {!mobile && (
        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <div className="flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-semibold text-[var(--color-text-muted)]">
            <SettingsIcon className="size-5 shrink-0" />
            <span>{dictionary.navigation.settings}</span>
            <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-slate-600">
              {dictionary.planned}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
