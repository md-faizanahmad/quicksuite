"use client";

import useOCR from "@/hooks/useOCR";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Trash2,
  Check,
  Languages,
  FileText,
  Download,
} from "lucide-react";

export default function OCRWorkspace() {
  const {
    isProcessing,
    progress,
    extractedText,
    copied,
    fileInputRef,
    handleFileUpload,
    copyToClipboard,
    downloadAsTxt,
    reset,
  } = useOCR();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {!extractedText && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative rounded-[2.5rem] border-2 border-dashed border-border bg-foreground/2 p-12 text-center transition-all hover:bg-foreground/5 sm:p-20"
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
          />

          <Languages
            className="mx-auto mb-4 opacity-20 transition-all duration-500 group-hover:scale-110"
            size={64}
          />

          <p className="text-xl font-black uppercase italic tracking-tight sm:text-2xl">
            Drop Document
          </p>

          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
            Images & Multi-page PDFs • 100% Local AI
          </p>
        </motion.div>
      )}

      {isProcessing && (
        <div className="flex flex-col items-center justify-center space-y-8 py-20">
          <div className="relative flex items-center justify-center">
            <svg className="h-32 w-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="opacity-5"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * progress) / 100}
                className="text-primary transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black italic tracking-tighter">
                {progress}%
              </span>
            </div>
          </div>

          <div className="space-y-1 text-center">
            <h3 className="font-black uppercase italic tracking-widest">
              Reading Content
            </h3>
            <p className="animate-pulse text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
              On-Device Neural Processing
            </p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {extractedText && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
              <div className="flex items-center gap-2 opacity-40">
                <FileText size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Extraction Result
                </span>
              </div>

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground/5 px-4 py-2 text-[10px] font-black uppercase italic transition-all hover:bg-primary hover:text-background sm:flex-none"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy Text"}
                </button>

                <button
                  onClick={downloadAsTxt}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground/5 px-4 py-2 text-[10px] font-black uppercase italic transition-all hover:bg-primary hover:text-background sm:flex-none"
                >
                  <Download size={14} />
                  Export .TXT
                </button>

                <button
                  onClick={reset}
                  aria-label="Clear extracted text"
                  className="rounded-xl bg-foreground/5 p-2 transition-all hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="group relative">
              <textarea
                readOnly
                value={extractedText}
                aria-label="Extracted text"
                className="custom-scrollbar h-[60vh] w-full resize-none overflow-y-auto rounded-[2.5rem] border border-border bg-card p-6 text-sm font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 sm:p-10"
              />

              <div className="pointer-events-none absolute bottom-6 right-8 text-[10px] font-black uppercase italic tracking-widest opacity-20">
                QuickSuite Local OCR Engine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
