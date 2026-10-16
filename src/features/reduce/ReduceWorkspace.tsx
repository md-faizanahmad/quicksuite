"use client";

import {
  Loader2,
  Plus,
  X,
  Zap,
  CheckCircle2,
  FileType,
  ArrowDownToLine,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useReduce from "@/hooks/useReduce";

export default function ReduceWorkspace() {
  const {
    file,
    target,
    setTarget,
    isProcessing,
    error,
    result,
    fileInputRef,
    handleFileUpload,
    onReduce,
    downloadFile,
    reset,
  } = useReduce();

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {/* Workspace header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              PDF compression
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              Reduce file size directly in your browser.
            </p>
          </div>

          {file && (
            <button
              type="button"
              onClick={reset}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCcw size={15} />
              Reset
            </button>
          )}
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {/* File upload */}
          {!file ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-52 w-full flex-col items-center justify-center border border-dashed border-border px-5 py-8 text-center transition hover:border-primary/60 hover:bg-primary/[0.03]"
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

              {!isProcessing && !result && (
                <button
                  type="button"
                  onClick={reset}
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
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Compression target */}
          {file && !result && (
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
                onChange={(event) => setTarget(Number(event.target.value))}
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

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-start gap-3 border border-red-500/25 bg-red-500/5 p-4"
                role="alert"
              >
                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-red-500"
                />
                <p className="text-sm leading-6 text-foreground">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
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
                  onClick={downloadFile}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  <ArrowDownToLine size={17} />
                  Download reduced file
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 w-full px-5 py-2.5 text-sm font-medium text-foreground/65 transition hover:text-foreground"
                >
                  Compress another file
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main action */}
          {file && !result && (
            <button
              type="button"
              onClick={onReduce}
              disabled={isProcessing}
              className="inline-flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Processing file...
                </>
              ) : (
                <>
                  <Zap size={17} />
                  Reduce file size
                </>
              )}
            </button>
          )}

          <div className="flex items-center justify-center gap-2 border-t border-border pt-4 text-xs text-foreground/50">
            <CheckCircle2 size={14} className="text-primary" />
            <span>Files are processed locally in your browser.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
