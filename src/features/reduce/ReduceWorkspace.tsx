"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { runReduction } from "@/lib/reduce-engine";
import * as pdfjs from "pdfjs-dist";

// Standard CDN worker for Next.js compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface ResultData {
  blob: Blob;
  url: string;
  finalSizeKB: number;
  savedPercent: number;
}

export default function ReduceWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    setResult(null);

    if (selectedFile.type === "application/pdf") {
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

        if (pdf.numPages > 2) {
          setError("QuickReduce currently supports only 1 or 2 page PDFs.");
          return;
        }
      } catch (err) {
        console.log(err);
        setError("Failed to read PDF structure. The file might be corrupted.");
        return;
      }
    }

    setFile(selectedFile);
  };

  const onReduce = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const reducedBlob = await runReduction(file, target);
      const url = URL.createObjectURL(reducedBlob);

      const saved = Math.max(
        0,
        ((file.size - reducedBlob.size) / file.size) * 100
      );
      const finalSizeKB = Number((reducedBlob.size / 1024).toFixed(1));

      setResult({
        blob: reducedBlob,
        url,
        finalSizeKB,
        savedPercent: Math.round(saved),
      });
    } catch (err) {
      console.log(err);
      setError("Optimization failed. Try a slightly higher target size.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!result || !file) return;
    const link = document.createElement("a");
    link.href = result.url;
    link.download = `reduced_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <AnimatePresence mode="wait">
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500"
          >
            <AlertTriangle size={20} className="shrink-0" />
            <p className="text-xs font-bold uppercase tracking-tight">
              {error}
            </p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X size={16} />
            </button>
          </motion.div>
        )}

        {/* Success State */}
        {result && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 p-8 rounded-[2.5rem] bg-sky-400/10 border border-sky-400/20 text-center"
          >
            <CheckCircle2 className="mx-auto text-sky-400 mb-4" size={40} />
            <h3 className="text-3xl font-black text-sky-400 italic mb-1">
              -{result.savedPercent}%
            </h3>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-6">
              Reduced to {result.finalSizeKB} KB
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={downloadFile}
                className="flex items-center justify-center gap-2 w-full py-4 bg-sky-400 text-black rounded-2xl font-black uppercase tracking-tighter hover:brightness-110 transition-all shadow-lg shadow-sky-400/20"
              >
                <ArrowDownToLine size={18} /> Download Optimized File
              </button>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 w-full py-3 text-sky-400/60 font-black text-[10px] uppercase tracking-widest hover:text-sky-400 transition-colors"
              >
                <RefreshCcw size={14} /> Start Fresh
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload & Controls */}
      {!result && (
        <div className="space-y-6">
          <div className="relative group">
            {!file ? (
              <div className="relative border-2 border-dashed border-sky-400/20 rounded-[2.5rem] p-12 text-center bg-sky-400/5 hover:bg-sky-400/10 transition-all">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <Plus className="mx-auto mb-3 text-sky-400" size={32} />
                <p className="font-black text-sm uppercase italic tracking-tighter">
                  Stage Document
                </p>
                <p className="text-[9px] opacity-40 font-bold uppercase tracking-widest mt-1">
                  JPG, PNG, OR 2-PAGE PDF
                </p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4 truncate">
                  <div className="p-3 bg-sky-400/10 rounded-xl text-sky-400">
                    <FileType size={20} />
                  </div>
                  <div className="truncate">
                    <p className="font-black text-sm truncate uppercase italic">
                      {file.name}
                    </p>
                    <p className="text-[10px] opacity-50 font-mono">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="p-2 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* KB Selection */}
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 100, 200].map((kb) => (
              <button
                key={kb}
                onClick={() => setTarget(kb)}
                className={`py-3 rounded-xl text-xs font-black border transition-all uppercase italic ${
                  target === kb
                    ? "bg-sky-400 text-black border-sky-400"
                    : "bg-white/5 border-transparent opacity-40 hover:opacity-100"
                }`}
              >
                {kb}KB
              </button>
            ))}
          </div>

          <button
            onClick={onReduce}
            disabled={!file || isProcessing}
            className="w-full flex items-center justify-center gap-3 py-5 bg-sky-400 text-black font-black rounded-2xl shadow-xl shadow-sky-400/20 disabled:opacity-20 transition-all active:scale-[0.98]"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Zap size={20} fill="black" />
            )}
            <span className="uppercase tracking-tighter italic">
              {isProcessing ? "Processing..." : `Reduce to ${target}KB`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
