"use client";

import useReduce from "@/hooks/useReduce";
import { Loader2, RefreshCcw, Zap } from "lucide-react";
import ReduceFilePanel from "./ReduceFilePanel";
import ReduceResultPanel from "./ReduceResultPanel";

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
          <ReduceFilePanel
            file={file}
            target={target}
            isProcessing={isProcessing}
            fileInputRef={fileInputRef}
            onFileUpload={handleFileUpload}
            onTargetChange={setTarget}
            onReset={reset}
          />

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

          <ReduceResultPanel
            error={error}
            result={result}
            isProcessing={isProcessing}
            onDownload={downloadFile}
            onReset={reset}
          />
        </div>
      </div>
    </section>
  );
}
