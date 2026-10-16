"use client";

import { ReduceResult } from "@/hooks/useReduce";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowDownToLine, CheckCircle2 } from "lucide-react";

interface ReduceResultPanelProps {
  error: string | null;
  result: ReduceResult | null;
  isProcessing: boolean;
  onDownload: () => void;
  onReset: () => void;
}

export default function ReduceResultPanel({
  error,
  result,
  isProcessing,
  onDownload,
  onReset,
}: ReduceResultPanelProps) {
  return (
    <div className="space-y-5">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 border border-red-500/25 bg-red-500/5 p-4"
            role="alert"
          >
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm leading-6 text-foreground">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border border-border p-5"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={21}
                className="mt-0.5 shrink-0 text-primary"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">
                  Compression complete
                </h3>
                <p className="mt-1 text-sm text-foreground/60">
                  Your processed file is ready to download.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="border border-border bg-background p-3">
                <p className="text-xs text-foreground/55">Final size</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
                  {result.finalSizeKB} KB
                </p>
              </div>

              <div className="border border-border bg-background p-3">
                <p className="text-xs text-foreground/55">Size reduced</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-primary">
                  {result.savedPercent}%
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onDownload}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
            >
              <ArrowDownToLine size={17} />
              Download reduced file
            </button>

            <button
              type="button"
              onClick={onReset}
              className="mt-3 w-full px-5 py-2.5 text-sm font-medium text-foreground/65 transition hover:text-foreground"
            >
              Compress another file
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-2 border-t border-border pt-4 text-xs text-foreground/50">
        <CheckCircle2 size={14} className="text-primary" />
        <span>Files are processed locally in your browser.</span>
      </div>

      {isProcessing && (
        <p className="text-center text-xs text-foreground/50">
          Processing your file…
        </p>
      )}
    </div>
  );
}
