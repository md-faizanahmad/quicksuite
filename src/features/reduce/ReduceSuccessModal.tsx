"use client";

import { useEffect } from "react";
import {
  ArrowDownToLine,
  CheckCircle2,
  FileText,
  RefreshCcw,
  X,
} from "lucide-react";
import { ReduceResult } from "@/hooks/useReduce";

interface ReduceSuccessModalProps {
  fileName: string;
  result: ReduceResult;
  onDownload: () => void;
  onCompressAnother: () => void;
  onClose: () => void;
}

export default function ReduceSuccessModal({
  fileName,
  result,
  onDownload,
  onCompressAnother,
  onClose,
}: ReduceSuccessModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="reduce-success-title"
        className="relative w-full max-w-md border border-border bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close result"
          className="absolute right-4 top-4 flex size-9 items-center justify-center text-foreground/55 transition hover:bg-background hover:text-foreground"
        >
          <X size={19} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
            <CheckCircle2 size={29} strokeWidth={1.8} />
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Compression complete
          </p>

          <h2
            id="reduce-success-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
          >
            Your file is ready
          </h2>

          <p className="mt-2 max-w-xs text-sm leading-6 text-foreground/60">
            Your reduced file has been downloaded automatically. You can
            download it again or compress another file.
          </p>
        </div>

        <div className="mt-6 flex min-w-0 items-center gap-3 border border-border p-3">
          <div className="flex size-10 shrink-0 items-center justify-center bg-background text-primary">
            <FileText size={20} />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium text-foreground">
              reduced_{fileName}
            </p>
            <p className="mt-1 text-xs text-foreground/55">
              Final size: {result.finalSizeKB} KB
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="border border-border p-3">
            <p className="text-xs text-foreground/55">Final size</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
              {result.finalSizeKB} KB
            </p>
          </div>

          <div className="border border-border p-3">
            <p className="text-xs text-foreground/55">Size reduced</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-primary">
              {result.savedPercent}%
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            <ArrowDownToLine size={18} />
            Download file
          </button>

          <button
            type="button"
            onClick={onCompressAnother}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-medium text-foreground transition hover:bg-background"
          >
            <RefreshCcw size={16} />
            Compress another file
          </button>
        </div>
      </section>
    </div>
  );
}
