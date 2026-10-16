"use client";

import { FileType, Plus, X } from "lucide-react";

interface ReduceFilePanelProps {
  file: File | null;
  target: number;
  isProcessing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTargetChange: (target: number) => void;
  onReset: () => void;
}

export default function ReduceFilePanel({
  file,
  target,
  isProcessing,
  fileInputRef,
  onFileUpload,
  onTargetChange,
  onReset,
}: ReduceFilePanelProps) {
  return (
    <div className="space-y-6">
      {!file ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex min-h-52 w-full flex-col items-center justify-center border border-dashed border-border px-5 py-8 text-center transition hover:border-primary/60 hover:bg-primary/3"
        >
          <span className="mb-4 flex size-12 items-center justify-center border border-border bg-background text-primary">
            <Plus size={22} />
          </span>

          <span className="text-base font-semibold text-foreground">
            Select a PDF or image
          </span>

          <span className="mt-2 text-sm text-foreground/60">
            Choose a file from your device to get started.
          </span>

          <span className="mt-4 text-xs text-foreground/45">
            PDF files are currently limited to 1–2 pages.
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-4 border border-border p-4">
          <div className="flex size-11 shrink-0 items-center justify-center bg-background text-primary">
            <FileType size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {file.name}
            </p>
            <p className="mt-1 text-xs text-foreground/55">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>

          {!isProcessing && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Remove selected file"
              className="flex size-8 shrink-0 items-center justify-center text-foreground/50 transition hover:bg-background hover:text-foreground"
            >
              <X size={17} />
            </button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,image/*"
        onChange={onFileUpload}
        className="hidden"
      />

      {file && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="compression-target"
              className="text-sm font-medium text-foreground"
            >
              Target size
            </label>

            <span className="text-sm font-semibold tabular-nums text-primary">
              {target} KB
            </span>
          </div>

          <input
            id="compression-target"
            type="range"
            min={10}
            max={1000}
            step={10}
            value={target}
            onChange={(event) => onTargetChange(Number(event.target.value))}
            disabled={isProcessing}
            className="w-full cursor-pointer accent-primary disabled:cursor-not-allowed"
          />

          <div className="flex justify-between text-xs text-foreground/45">
            <span>10 KB</span>
            <span>1,000 KB</span>
          </div>

          <p className="text-xs leading-5 text-foreground/55">
            The final size can vary depending on the original file and its
            contents.
          </p>
        </div>
      )}
    </div>
  );
}
