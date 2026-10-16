"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCcw, Zap, CheckCircle2 } from "lucide-react";
import useReduce from "@/features/reduce/hooks/useReduce";
import ReduceFilePanel from "@/features/reduce/components/ReduceFilePanel";
import ReduceResultPanel from "@/features/reduce/components/ReduceResultPanel";
import ReduceSuccessModal from "@/features/reduce/components/ReduceSuccessModal";

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

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  useEffect(() => {
    if (result) setIsResultModalOpen(true);
  }, [result]);

  const handleCompressAnother = () => {
    setIsResultModalOpen(false);
    reset();
  };

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

          {file && !isProcessing && (
            <button
              type="button"
              onClick={handleCompressAnother}
              className="inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-foreground"
            >
              <RefreshCcw size={15} />
              Reset
            </button>
          )}
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {result ? (
            <button
              type="button"
              onClick={() => setIsResultModalOpen(true)}
              className="flex w-full items-center gap-3 border border-border p-4 text-left transition hover:bg-background"
            >
              <CheckCircle2 size={22} className="shrink-0 text-primary" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  Compression complete
                </span>
                <span className="mt-1 block text-xs text-foreground/60">
                  {result.finalSizeKB} KB · {result.savedPercent}% reduced
                </span>
              </span>
              <span className="text-sm font-medium text-primary">
                View result
              </span>
            </button>
          ) : (
            <>
              <ReduceFilePanel
                file={file}
                target={target}
                isProcessing={isProcessing}
                fileInputRef={fileInputRef}
                onFileUpload={handleFileUpload}
                onTargetChange={setTarget}
                onReset={reset}
              />

              {file && (
                <button
                  type="button"
                  onClick={onReduce}
                  disabled={isProcessing}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
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
            </>
          )}

          <ReduceResultPanel error={error} />
        </div>
      </div>

      {isResultModalOpen && file && result && (
        <ReduceSuccessModal
          fileName={file.name}
          result={result}
          onDownload={downloadFile}
          onCompressAnother={handleCompressAnother}
          onClose={() => setIsResultModalOpen(false)}
        />
      )}
    </section>
  );
}
