"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import { CloseIcon, FileIcon, UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  formatFileSize,
  validatePrototypeFile,
} from "@/lib/upload-prototype";

type UploadDropzoneProps = Readonly<{
  copy: Dictionary["upload"];
}>;

type SelectedFile = Readonly<{
  name: string;
  size: string;
}>;

export function UploadDropzone({ copy }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | undefined) {
    setIsDragging(false);

    if (!file) {
      return;
    }

    const result = validatePrototypeFile(file);

    if (!result.valid) {
      setSelectedFile(null);
      setError(
        result.reason === "file_too_large"
          ? copy.fileTooLarge
          : copy.unsupportedType,
      );
      resetInput();
      return;
    }

    setError(null);
    setSelectedFile({ name: file.name, size: formatFileSize(file.size) });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  }

  function resetInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeFile() {
    setSelectedFile(null);
    setError(null);
    resetInput();
  }

  const zoneStateClasses = error
    ? "border-red-300 bg-red-50/60"
    : isDragging
      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
      : "border-[var(--color-border-strong)] bg-[var(--color-surface-subtle)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]";

  return (
    <div>
      <input
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="sr-only"
        id="prototype-file"
        onChange={handleInputChange}
        ref={inputRef}
        type="file"
      />

      {selectedFile ? (
        <div className="rounded-[var(--radius-lg)] border border-emerald-200 bg-[var(--color-success-soft)] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-white text-[var(--color-success)] shadow-sm">
              <FileIcon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[var(--color-success)]">
                {copy.selected}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-[var(--color-text)]">
                {selectedFile.name}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {selectedFile.size} · {copy.selectedHint}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <label
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]"
                  htmlFor="prototype-file"
                >
                  {copy.chooseAnother}
                </label>
                <Button onClick={removeFile} variant="ghost">
                  <CloseIcon className="size-4" />
                  {copy.remove}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-[var(--radius-lg)] border-2 border-dashed p-6 text-center transition-colors sm:p-10 ${zoneStateClasses}`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-[var(--color-brand-strong)] shadow-sm">
            <UploadIcon className="size-6" />
          </span>
          <p className="mt-4 font-bold">
            {isDragging ? copy.dropActive : copy.dropTitle}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {copy.dropHint}
          </p>
          <label
            className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-brand-strong)]"
            htmlFor="prototype-file"
          >
            {copy.chooseFile}
          </label>
          <p className="mt-4 text-xs font-medium text-[var(--color-text-muted)]">
            {copy.formats}
          </p>
        </div>
      )}

      <div aria-live="polite">
        {error && (
          <p className="mt-3 rounded-[var(--radius-md)] bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
