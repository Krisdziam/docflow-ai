"use client";

import { useState } from "react";

import { DocumentsIcon, FileIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SupportedLocale } from "@/lib/app-config";
import {
  filterPrototypeDocuments,
  prototypeDocuments,
  type DocumentFilter,
  type DocumentStatus,
  type DocumentType,
  type PrototypeDocument,
} from "@/lib/document-prototype";

type DocumentQueueProps = Readonly<{
  copy: Dictionary["queue"];
  locale: SupportedLocale;
}>;

type QueueViewState = "ready" | "loading" | "empty" | "error";

const filters: readonly DocumentFilter[] = [
  "all",
  "needs_review",
  "processing",
  "approved",
  "duplicate",
  "failed",
];

const viewStates: readonly QueueViewState[] = [
  "ready",
  "loading",
  "empty",
  "error",
];

const statusTones = {
  processing: "brand",
  needs_review: "warning",
  approved: "success",
  failed: "danger",
  duplicate: "neutral",
} as const;

export function DocumentQueue({ copy, locale }: DocumentQueueProps) {
  const [filter, setFilter] = useState<DocumentFilter>("all");
  const [viewState, setViewState] = useState<QueueViewState>("ready");
  const [selectedId, setSelectedId] = useState(prototypeDocuments[0]?.id ?? "");

  const filteredDocuments = filterPrototypeDocuments(prototypeDocuments, filter);
  const selectedDocument =
    filteredDocuments.find((document) => document.id === selectedId) ??
    filteredDocuments[0];

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-[var(--color-border)] p-4 sm:p-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-brand-strong)]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em]" id="documents-title">
            {copy.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
            {copy.description}
          </p>
        </div>

        <label className="grid gap-1.5 text-sm font-semibold text-[var(--color-text-muted)]">
          {copy.scenarioLabel}
          <select
            className="min-h-11 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 text-[var(--color-text)]"
            onChange={(event) => setViewState(event.target.value as QueueViewState)}
            value={viewState}
          >
            {viewStates.map((state) => (
              <option key={state} value={state}>
                {getViewStateLabel(copy, state)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 py-3 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          {copy.prototypeNotice}
        </p>
      </div>

      {viewState === "loading" ? (
        <QueueLoading copy={copy} />
      ) : viewState === "empty" ? (
        <QueueMessage
          action={copy.showDocuments}
          body={copy.emptyBody}
          copy={copy}
          onAction={() => setViewState("ready")}
          title={copy.emptyTitle}
        />
      ) : viewState === "error" ? (
        <QueueMessage
          action={copy.retry}
          body={copy.errorBody}
          copy={copy}
          error
          onAction={() => setViewState("ready")}
          title={copy.errorTitle}
        />
      ) : (
        <div className="grid min-h-[34rem] lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]">
          <div className="min-w-0 border-b border-[var(--color-border)] lg:border-b-0 lg:border-r">
            <div className="scrollbar-hidden overflow-x-auto border-b border-[var(--color-border)] px-4 py-3 sm:px-6">
              <div aria-label={copy.filterLabel} className="flex min-w-max gap-2" role="group">
                {filters.map((item) => (
                  <button
                    aria-pressed={filter === item}
                    className={`min-h-10 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                      filter === item
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                        : "border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                    }`}
                    key={item}
                    onClick={() => setFilter(item)}
                    type="button"
                  >
                    {getFilterLabel(copy, item)}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {filteredDocuments.map((document) => (
                <DocumentRow
                  copy={copy}
                  document={document}
                  isSelected={selectedDocument?.id === document.id}
                  key={document.id}
                  locale={locale}
                  onSelect={() => setSelectedId(document.id)}
                />
              ))}
            </div>
          </div>

          <DocumentDetails copy={copy} document={selectedDocument} locale={locale} />
        </div>
      )}
    </div>
  );
}

function DocumentRow({
  copy,
  document,
  isSelected,
  locale,
  onSelect,
}: Readonly<{
  copy: Dictionary["queue"];
  document: PrototypeDocument;
  isSelected: boolean;
  locale: SupportedLocale;
  onSelect: () => void;
}>) {
  return (
    <button
      aria-pressed={isSelected}
      className={`grid w-full gap-3 p-4 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5 ${
        isSelected
          ? "bg-[var(--color-brand-soft)]"
          : "bg-white hover:bg-[var(--color-surface-subtle)]"
      }`}
      onClick={onSelect}
      type="button"
    >
      <span className="flex min-w-0 gap-3">
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-white text-[var(--color-brand-strong)] shadow-sm">
          <FileIcon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-bold">{document.supplier}</span>
          <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
            {getTypeLabel(copy, document.type)} · {document.documentNumber}
          </span>
          <span className="mt-1 block truncate text-xs text-[var(--color-text-muted)]">
            {document.fileName}
          </span>
        </span>
      </span>
      <span className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <StatusBadge copy={copy} status={document.status} />
        <span className="text-xs font-medium text-[var(--color-text-muted)]">
          {formatDateTime(document.receivedAt, locale)}
        </span>
      </span>
    </button>
  );
}

function DocumentDetails({
  copy,
  document,
  locale,
}: Readonly<{
  copy: Dictionary["queue"];
  document: PrototypeDocument | undefined;
  locale: SupportedLocale;
}>) {
  if (!document) {
    return (
      <div className="grid min-h-64 place-items-center p-6 text-center text-sm text-[var(--color-text-muted)]">
        {copy.noFilterResults}
      </div>
    );
  }

  return (
    <aside aria-labelledby="document-details-title" className="bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            {copy.detailsEyebrow}
          </p>
          <h3 className="mt-2 text-xl font-bold" id="document-details-title">
            {document.documentNumber}
          </h3>
        </div>
        <StatusBadge copy={copy} status={document.status} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-[var(--color-border)] py-5">
        <Detail label={copy.supplier} value={document.supplier} />
        <Detail label={copy.type} value={getTypeLabel(copy, document.type)} />
        <Detail
          label={copy.amount}
          value={formatAmount(document.amount, document.currency, locale, copy.notAvailable)}
        />
        <Detail label={copy.documentDate} value={formatDate(document.details.documentDate, locale)} />
        <Detail
          label={copy.dueDate}
          value={
            document.details.dueDate
              ? formatDate(document.details.dueDate, locale)
              : copy.notAvailable
          }
        />
        <Detail
          label={copy.purchaseOrder}
          value={document.details.purchaseOrder ?? copy.notAvailable}
        />
      </dl>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          {copy.summary}
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          {document.details.summary[locale]}
        </p>
      </div>

      {document.details.reviewReason && (
        <div className="mt-5 rounded-[var(--radius-md)] border border-orange-200 bg-[var(--color-warning-soft)] p-4">
          <p className="text-sm font-bold text-[var(--color-warning)]">
            {copy.attentionReason}
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
            {document.details.reviewReason[locale]}
          </p>
        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-[var(--color-text-muted)]">
        {copy.detailsNotice}
      </p>
    </aside>
  );
}

function Detail({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <dt className="text-xs font-semibold text-[var(--color-text-muted)]">{label}</dt>
      <dd className="mt-1 text-sm font-bold">{value}</dd>
    </div>
  );
}

function StatusBadge({
  copy,
  status,
}: Readonly<{ copy: Dictionary["queue"]; status: DocumentStatus }>) {
  return <Badge tone={statusTones[status]}>{getStatusLabel(copy, status)}</Badge>;
}

function QueueLoading({ copy }: Readonly<{ copy: Dictionary["queue"] }>) {
  return (
    <div aria-live="polite" className="p-5 sm:p-6" role="status">
      <p className="font-bold">{copy.loadingTitle}</p>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{copy.loadingBody}</p>
      <div aria-hidden="true" className="mt-6 space-y-3">
        {[0, 1, 2].map((item) => (
          <div className="animate-pulse rounded-[var(--radius-md)] border border-[var(--color-border)] p-4" key={item}>
            <div className="h-4 w-2/5 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-3/5 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueMessage({
  action,
  body,
  copy,
  error = false,
  onAction,
  title,
}: Readonly<{
  action: string;
  body: string;
  copy: Dictionary["queue"];
  error?: boolean;
  onAction: () => void;
  title: string;
}>) {
  return (
    <div className="grid min-h-[24rem] place-items-center p-6 text-center" role={error ? "alert" : "status"}>
      <div className="max-w-md">
        <span className={`mx-auto grid size-12 place-items-center rounded-full ${error ? "bg-red-50 text-red-700" : "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]"}`}>
          <DocumentsIcon className="size-6" />
        </span>
        <h3 className="mt-4 text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{body}</p>
        <Button className="mt-5" onClick={onAction} variant={error ? "secondary" : "primary"}>
          {action}
        </Button>
        <p className="mt-4 text-xs text-[var(--color-text-muted)]">{copy.stateNotice}</p>
      </div>
    </div>
  );
}

function getFilterLabel(copy: Dictionary["queue"], filter: DocumentFilter) {
  return filter === "all" ? copy.filterAll : getStatusLabel(copy, filter);
}

function getStatusLabel(copy: Dictionary["queue"], status: DocumentStatus) {
  return {
    processing: copy.statusProcessing,
    needs_review: copy.statusNeedsReview,
    approved: copy.statusApproved,
    failed: copy.statusFailed,
    duplicate: copy.statusDuplicate,
  }[status];
}

function getTypeLabel(copy: Dictionary["queue"], type: DocumentType) {
  return {
    invoice: copy.typeInvoice,
    purchase_order: copy.typePurchaseOrder,
    delivery_note: copy.typeDeliveryNote,
  }[type];
}

function getViewStateLabel(copy: Dictionary["queue"], state: QueueViewState) {
  return {
    ready: copy.scenarioReady,
    loading: copy.scenarioLoading,
    empty: copy.scenarioEmpty,
    error: copy.scenarioError,
  }[state];
}

function formatDateTime(value: string, locale: SupportedLocale) {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDate(value: string, locale: SupportedLocale) {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00Z`));
}

function formatAmount(
  amount: number | null,
  currency: PrototypeDocument["currency"],
  locale: SupportedLocale,
  fallback: string,
) {
  if (amount === null || currency === null) {
    return fallback;
  }

  const [whole, fraction] = amount.toFixed(2).split(".");
  const separator = locale === "uk" ? "\u00a0" : ",";
  const groupedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const decimalSeparator = locale === "uk" ? "," : ".";

  return `${groupedWhole}${decimalSeparator}${fraction} ${currency}`;
}
