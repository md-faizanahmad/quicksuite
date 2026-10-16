"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import type { ChangeEvent, RefObject } from "react";

interface OCRUploadPanelProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  isProcessing: boolean;
  progress: number;
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function OCRUploadPanel({
  fileInputRef,
  isProcessing,
  progress,
  onFileUpload,
}: OCRUploadPanelProps) {
  if (isProcessing) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-8 py-14 sm:py-20"
        role="status"
        aria-live="polite"
      >
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 128 128"
            className="h-28 w-28 -rotate-90 sm:h-32 sm:w-32"
            aria-hidden="true"
          >
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="opacity-10"
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * progress) / 100}
              strokeLinecap="round"
              className="text-primary transition-all duration-300"
            />
          </svg>

          <span className="absolute text-2xl font-bold tabular-nums">
            {progress}%
          </span>
        </div>

        <div className="space-y-2 text-center">
          <h3 className="font-semibold tracking-tight text-foreground">
            Reading content
          </h3>
          <p className="text-sm text-foreground/55">
            Processing your document on this device
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-dashed border-border bg-card p-7 text-center transition-colors hover:bg-foreground/[0.02] sm:p-12"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={onFileUpload}
        aria-label="Choose an image or PDF for text extraction"
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      />

      <div className="pointer-events-none">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-background text-primary">
          <Languages size={27} strokeWidth={1.7} />
        </div>

        <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          Choose a document
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-foreground/60">
          Select an image or PDF to extract its text.
        </p>

        <p className="mt-4 text-xs text-foreground/40">
          Images and multi-page PDFs
        </p>
      </div>
    </motion.div>
  );
}
