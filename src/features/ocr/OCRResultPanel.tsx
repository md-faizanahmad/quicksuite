"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, FileText, Share2, Trash2 } from "lucide-react";

interface OCRResultPanelProps {
  extractedText: string;
  copied: boolean;
  onCopy: () => Promise<void>;
  onDownload: () => void;
  onReset: () => void;
}

export default function OCRResultPanel({
  extractedText,
  copied,
  onCopy,
  onDownload,
  onReset,
}: OCRResultPanelProps) {
  const [shareMessage, setShareMessage] = useState("");

  const handleShare = async () => {
    if (!extractedText.trim()) return;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "QuickSuite OCR Result",
          text: extractedText,
        });
        setShareMessage("");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        // Fall back to copying if native sharing fails.
      }
    }

    try {
      await navigator.clipboard.writeText(extractedText);
      setShareMessage("Text copied. You can now share it.");
    } catch {
      setShareMessage("Sharing is unavailable. Please copy the text manually.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-foreground/60">
          <FileText size={17} />
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Extracted text
            </h2>
            <p className="text-xs text-foreground/50">
              {extractedText.length.toLocaleString()} characters
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            <Share2 size={16} />
            Share
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            <Download size={16} />
            Download TXT
          </button>

          <button
            type="button"
            onClick={onReset}
            aria-label="Clear extracted text"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>

      {shareMessage && (
        <p className="text-sm text-foreground/65" role="status">
          {shareMessage}
        </p>
      )}

      <textarea
        readOnly
        value={extractedText}
        aria-label="Extracted text"
        className="min-h-[50vh] w-full resize-y rounded-xl border border-border bg-card p-4 text-sm leading-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 sm:min-h-[60vh] sm:p-6"
      />

      <p className="text-right text-xs text-foreground/40">QuickSuite OCR</p>
    </motion.section>
  );
}
