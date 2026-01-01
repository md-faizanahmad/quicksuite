"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Loader2,
  Plus,
  X,
  Zap,
  CheckCircle2,
  FileType,
  ArrowRight,
} from "lucide-react";
import { runReduction } from "@/lib/reduce-engine";

export default function ReduceWorkspace() {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [target, setTarget] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    url: string;
    finalSize: string;
    savedPercent: string;
  } | null>(null);

  /**
   * Triggers the reduction engine and calculates statistics
   */
  const onReduce = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      // Create a virtual file if we are re-processing a previous result blob
      const activeFile =
        file instanceof File
          ? file
          : new File([file], fileName, { type: file.type });

      const blob = await runReduction(activeFile, target);
      const url = URL.createObjectURL(blob);

      // Math for the "Efficiency Gained" UI
      const saved = (
        ((activeFile.size - blob.size) / activeFile.size) *
        100
      ).toFixed(0);
      const finalSize = (blob.size / 1024).toFixed(1);

      setResult({
        blob,
        url,
        finalSize: `${finalSize} KB`,
        savedPercent: `${saved}%`,
      });
    } catch (e) {
      console.error(e);
      alert("Error optimizing file. Ensure file is not password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * "Pipeline Recycle": Puts the current result back as the input
   */
  const handleReOptimize = () => {
    if (!result) return;
    setFile(result.blob); // The output becomes the input
    setResult(null); // Clear success screen to let user run it again
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setFileName("");
    setResult(null);
  };

  return (
    <div className="max-w-xl mx-auto px-4 pb-32">
      {/* 1. SUCCESS CARD: Displays result stats and Re-reduce button */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 p-6 rounded-4xl bg-sky-400/10 border border-sky-400/20 text-center space-y-4"
          >
            <CheckCircle2 className="mx-auto text-sky-400" size={32} />
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-foreground/40">
                Efficiency Gained
              </p>
              <p className="text-3xl font-black text-sky-400">
                -{result.savedPercent}
              </p>
            </div>

            <div className="flex justify-center gap-4 py-2 border-t border-white/5 pt-4">
              <button
                onClick={handleReOptimize}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-sky-400 transition-all border border-sky-400/20"
              >
                <ArrowRight size={14} /> RE-REDUCE THIS FILE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. UPLOAD ZONE: Staging input */}
      <div className="relative group mb-6">
        {!file ? (
          <div className="relative border-2 border-dashed border-sky-400/20 rounded-[2.5rem] p-12 text-center bg-sky-400/5 hover:bg-sky-400/10 transition-all">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setFileName(f.name);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <Plus className="mx-auto mb-3 text-sky-400" size={28} />
            <p className="font-black text-sm uppercase italic ">
              Stage Document
            </p>
          </div>
        ) : (
          <div className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-3 bg-sky-400/10 rounded-xl text-sky-400">
                <FileType size={20} />
              </div>
              <div className="min-w-0">
                <p className="font-black text-sm truncate  uppercase italic leading-tight">
                  {fileName}
                </p>
                <p className="text-[10px] opacity-50 font-mono font-bold  uppercase">
                  Current: {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="p-2 text-foreground/20 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 3. SETTINGS: Size target presets */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {[25, 50, 75, 100].map((kb) => (
          <button
            key={kb}
            onClick={() => {
              setTarget(kb);
              if (result) reset();
            }}
            className={`py-3 rounded-xl text-xs font-black border transition-all ${
              target === kb
                ? "bg-sky-400 text-black border-sky-400 shadow-lg shadow-sky-400/20"
                : "bg-white/5 border-transparent text-foreground/40"
            }`}
          >
            {kb}KB
          </button>
        ))}
      </div>

      {/* 4. PRIMARY ACTION: Fixed to bottom for PWA/Phone ergonomics */}
      <div className="fixed bottom-6 left-6 right-6 md:relative md:bottom-0">
        {result ? (
          <a
            href={result.url}
            download={`Reduced_${fileName}`}
            className="w-full flex items-center justify-center gap-3 py-5 bg-sky-400 text-black font-black rounded-2xl shadow-xl shadow-sky-400/20 active:scale-95 transition-transform"
          >
            <Download size={20} />
            <span className="uppercase tracking-tighter italic font-black text-black">
              Download File ({result.finalSize})
            </span>
          </a>
        ) : (
          <button
            onClick={onReduce}
            disabled={!file || isProcessing}
            className="w-full flex items-center justify-center gap-3 py-5 bg-sky-400 text-black font-black rounded-2xl shadow-xl shadow-sky-400/20 active:scale-95 disabled:opacity-20 transition-all"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Zap size={20} fill="black" />
            )}
            <span className="uppercase tracking-tighter italic font-black text-black">
              {isProcessing ? "Recalculating..." : `Optimize to ${target}KB`}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
