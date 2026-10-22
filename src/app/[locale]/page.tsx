import { notFound } from "next/navigation";

import { ArrowIcon, ArchiveIcon, DocumentsIcon, ReviewIcon } from "@/components/icons";
import { DocumentQueue } from "@/components/document-queue";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { UploadDropzone } from "@/components/upload-dropzone";
import { getDictionary } from "@/i18n/dictionaries";
import { isSupportedLocale } from "@/lib/app-config";

type LocalizedPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const modules = [
    {
      id: "documents",
      icon: DocumentsIcon,
      ...dictionary.modules.documents,
    },
    { id: "review", icon: ReviewIcon, ...dictionary.modules.review },
    { id: "archive", icon: ArchiveIcon, ...dictionary.modules.archive },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] xl:gap-12">
        <div>
          <Badge tone="brand">{dictionary.page.milestone}</Badge>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-strong)]">
            {dictionary.page.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-[length:var(--text-3xl)] font-bold leading-tight tracking-[-0.035em] text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {dictionary.page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            {dictionary.page.description}
          </p>
          <a
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
            href="#upload"
          >
            {dictionary.page.primaryAction}
            <ArrowIcon className="size-4" />
          </a>
        </div>

        <Card className="overflow-hidden p-1">
          <div className="rounded-[calc(var(--radius-lg)-0.25rem)] bg-[linear-gradient(145deg,var(--color-brand-soft),white_65%)] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[var(--color-success)]">
              <span className="size-2 rounded-full bg-current" />
              <span className="text-sm font-bold">{dictionary.page.status}</span>
            </div>
            <div className="mt-12 border-l-4 border-[var(--color-brand)] pl-4">
              <h2 className="font-bold">{dictionary.page.noticeTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {dictionary.page.noticeBody}
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section
        aria-labelledby="upload-title"
        className="mt-16 scroll-mt-40"
        id="upload"
      >
        <Card className="grid gap-0 overflow-hidden lg:grid-cols-[minmax(0,0.75fr)_minmax(25rem,1.25fr)]">
          <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-strong)]">
              {dictionary.upload.eyebrow}
            </p>
            <h2
              className="mt-3 text-2xl font-bold tracking-[-0.025em]"
              id="upload-title"
            >
              {dictionary.upload.title}
            </h2>
            <p className="mt-3 leading-7 text-[var(--color-text-muted)]">
              {dictionary.upload.description}
            </p>
            <div className="mt-6 rounded-[var(--radius-md)] border border-blue-200 bg-[var(--color-brand-soft)] p-4">
              <p className="text-sm font-bold text-[var(--color-brand-strong)]">
                {dictionary.upload.privacyTitle}
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                {dictionary.upload.privacyBody}
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-8">
            <UploadDropzone copy={dictionary.upload} />
          </div>
        </Card>
      </section>

      <section
        aria-labelledby="documents-title"
        className="mt-16 scroll-mt-40"
        id="documents"
      >
        <Card className="overflow-hidden">
          <DocumentQueue copy={dictionary.queue} locale={locale} />
        </Card>
      </section>

      <section className="mt-16 scroll-mt-40" id="workspace">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.025em]">
            {dictionary.page.workspaceTitle}
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            {dictionary.page.workspaceDescription}
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {modules.filter((module) => module.id !== "documents").map((module) => {
            const Icon = module.icon;

            return (
              <Card
                className="scroll-mt-40 p-5 sm:p-6"
                id={module.id}
                key={module.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]">
                    <Icon className="size-5" />
                  </span>
                  <Badge>{dictionary.planned}</Badge>
                </div>
                <h3 className="mt-5 text-lg font-bold">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  {module.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
