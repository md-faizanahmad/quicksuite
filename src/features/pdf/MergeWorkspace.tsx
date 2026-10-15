"use client";

import usePdfMerge from "@/hooks/usePdfMerge";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  RefreshCcw,
  Plus,
} from "lucide-react";
import MergeFileList from "./MergeFileList";

export default function MergeWorkspace() {
  const {
    files,
    setFiles,
    status,
    mergedUrl,
    handleUpload,
    handleMerge,
    removeFile,
    resetWorkspace,
  } = usePdfMerge();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Success Banner */}
      {status === "completed" && mergedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-primary" />

            <div>
              <h3 className="font-semibold text-foreground">
                PDFs merged successfully
              </h3>
              <p className="mt-1 text-sm text-foreground/60">
                Your merged document is ready to download.
              </p>
            </div>
          </div>

          <a
            href={mergedUrl}
            download="quicksuite-merged.pdf"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            <Download size={16} />
            Download PDF
          </a>
        </motion.div>
      )}

      {/* Upload Area */}
      <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-foreground">
            Select PDF files
          </h2>

          <p className="mt-1 text-sm text-foreground/60">
            Choose the documents you want to combine. Arrange their order before
            merging.
          </p>
        </div>

        <label className="group flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background px-5 py-8 text-center transition-colors hover:border-primary/60 hover:bg-primary/3">
          <span className="mb-3 flex size-12 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors group-hover:border-primary/30">
            <Plus size={24} />
          </span>

          <span className="font-medium text-foreground">Upload PDF files</span>

          <span className="mt-1 text-sm text-foreground/55">
            Click to browse your device
          </span>

          <span className="mt-3 text-xs text-foreground/40">
            PDF documents only
          </span>

          <input
            type="file"
            multiple
            accept=".pdf,application/pdf"
            onChange={handleUpload}
            className="sr-only"
          />
        </label>

        <p className="mt-4 text-xs text-foreground/50">
          Your files are processed locally in your browser.
        </p>
      </section>

      {/* File List and Merge Action */}
      {files.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <MergeFileList
            files={files}
            onReorder={setFiles}
            onRemove={removeFile}
            onUpload={handleUpload}
            disabled={status === "processing"}
          />

          {/* Centered Merge Button */}
          <div className="flex flex-col items-center gap-3 py-2">
            <button
              type="button"
              onClick={handleMerge}
              disabled={
                files.length < 2 ||
                status === "processing" ||
                status === "completed"
              }
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:min-w-52"
            >
              {status === "processing" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Merging PDFs...
                </>
              ) : status === "completed" ? (
                <>
                  <CheckCircle2 size={17} />
                  Merge complete
                </>
              ) : (
                <>
                  <FileText size={17} />
                  Merge PDFs
                </>
              )}
            </button>

            <p className="max-w-md text-center text-sm text-foreground/55">
              {files.length < 2
                ? "Add at least one more PDF to start merging."
                : `${files.length} PDFs will be combined in the order shown above.`}
            </p>

            {status === "completed" && (
              <button
                type="button"
                onClick={resetWorkspace}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-card hover:text-foreground"
              >
                <RefreshCcw size={15} />
                Prepare another merge
              </button>
            )}
          </div>
        </motion.section>
      )}
    </div>
  );
}
