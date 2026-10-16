"use client";

import { useEffect } from "react";
import { CheckCircle2, Download, FileText, Plus, X } from "lucide-react";

interface ImageToPdfResultModalProps {
  pdfUrl: string;
  imageCount: number;
  onConvertMore: () => void;
  onClose: () => void;
}

export default function ImageToPdfResultModal({
  pdfUrl,
  imageCount,
  onConvertMore,
  onClose,
}: ImageToPdfResultModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
        aria-labelledby="image-pdf-success-title"
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
            Conversion complete
          </p>

          <h2
            id="image-pdf-success-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
          >
            Your PDF is ready
          </h2>

          <p className="mt-2 max-w-xs text-sm leading-6 text-foreground/60">
            Your {imageCount} {imageCount === 1 ? "image has" : "images have"}{" "}
            been combined into one PDF. Download it or continue working with
            more images.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 border border-border p-3">
          <div className="flex size-10 shrink-0 items-center justify-center bg-background text-primary">
            <FileText size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              quicksuite-converted.pdf
            </p>
            <p className="mt-1 text-xs text-foreground/55">
              PDF document · {imageCount}{" "}
              {imageCount === 1 ? "image" : "images"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <a
            href={pdfUrl}
            download="quicksuite-converted.pdf"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            <Download size={18} />
            Download PDF
          </a>

          <button
            type="button"
            onClick={onConvertMore}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-medium text-foreground transition hover:bg-background"
          >
            <Plus size={17} />
            Convert more images
          </button>
        </div>
      </section>
    </div>
  );
}
