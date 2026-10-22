import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ApplicationShell } from "@/components/application-shell";
import { getDictionary } from "@/i18n/dictionaries";
import {
  isSupportedLocale,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/app-config";

import "../globals.css";

type LocalizedLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const metadata: Metadata = {
  title: "DocFlow AI",
  description: "Bilingual document-processing and approval prototype",
};

export function generateStaticParams(): { locale: SupportedLocale }[] {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <html data-scroll-behavior="smooth" lang={locale}>
      <body>
        <ApplicationShell dictionary={dictionary} locale={locale}>
          {children}
        </ApplicationShell>
      </body>
    </html>
  );
}
