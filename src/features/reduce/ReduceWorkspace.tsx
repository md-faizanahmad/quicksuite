"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  Download,
  Loader2,
  Plus,
  X,
  Zap,
  RefreshCcw,
  CheckCircle2,
  FileType,
} from "lucide-react";
import { runReduction } from "@/lib/reduce-engine";

const PRESETS = [25, 50, 75, 100];

export default function ReduceWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState(100);
  const [isCustom, setIsCustom] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; saved: string } | null>(
    null
  );

  const onReduce = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const blob = await runReduction(file, target);
      const saved = (((file.size - blob.size) / file.size) * 100).toFixed(0);
      setResult({ url: URL.createObjectURL(blob), saved });
    } catch (e) {
      console.error(e);
      alert("Error processing file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 pb-32">
      {/* 1. COMPRESSION SETTINGS */}
      <div className="bg-card border border-border rounded-3xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4 opacity-60">
          <Settings2 size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Target Size
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {PRESETS.map((kb) => (
            <button
              key={kb}
              onClick={() => {
                setTarget(kb);
                setIsCustom(false);
              }}
              className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                target === kb && !isCustom
                  ? "bg-sky-700 text-white border-sky-400"
                  : "bg-white/5 border-transparent text-foreground/40"
              }`}
            >
              {kb}KB
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCustom(!isCustom)}
          className={`w-full py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${
            isCustom
              ? "border-sky-400 text-sky-400"
              : "border-white/5 text-foreground/20"
          }`}
        >
          {isCustom ? "✓ Custom KB Active" : "Set Custom Limit"}
        </button>

        <AnimatePresence>
          {isCustom && (
            <motion.input
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 50, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              type="number"
              inputMode="numeric"
              placeholder="Enter KB (e.g. 150)"
              className="w-full mt-3 bg-white/5 border border-white/10 rounded-xl px-4 outline-none focus:border-sky-400 text-sky-400 font-mono"
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          )}
        </AnimatePresence>
      </div>
      {/* 2. SUCCESS FEEDBACK */}
      {/* 3. UPLOAD / STAGING */}
      <div className="relative group mb-8">
        {!file ? (
          <>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-sky-400/20 rounded-[2.5rem] p-12 text-center bg-sky-400/5 hover:bg-sky-400/10 transition-all">
              <Plus className="mx-auto mb-3 text-sky-400" size={28} />
              <p className="font-bold text-sm uppercase italic dark:text-white text-black">
                Stage Document
              </p>
              <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">
                PDF or Image
              </p>
            </div>
          </>
        ) : (
          <div className="bg-card border border-border p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0">
                <FileType size={20} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs truncate dark:text-white text-black uppercase italic">
                  {file.name}
                </p>
                <p className="text-[15px] text-black  font-mono uppercase tracking-tighter">
                  Current: {(file.size / 1024).toFixed(0)} KB
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
      </div>{" "}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/30 border border-emerald-500/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-black">
              <CheckCircle2 size={20} />
              <span className="text-[12px] font-black uppercase ">
                Reduced by {result.saved}%
              </span>
            </div>
            <button onClick={reset} className=" hover:text-white">
              <RefreshCcw size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 4. FLOATING ACTION (Thumb Friendly) */}
      <div className="fixed bottom-6 left-6 right-6 md:relative md:bottom-0 md:left-0 md:right-0">
        {result ? (
          <a
            href={result.url}
            download={`Reduced_${file?.name}`}
            className="w-full flex items-center justify-center gap-3 py-5 bg-sky-400 text-black font-black rounded-2xl shadow-xl shadow-sky-400/20 active:scale-95 transition-all"
          >
            <Download size={20} />
            <span className="uppercase tracking-tighter italic">
              Download File
            </span>
          </a>
        ) : (
          <button
            onClick={onReduce}
            disabled={!file || isProcessing}
            className="w-full flex items-center justify-center gap-3 py-5 bg-sky-400 text-black font-black rounded-2xl shadow-xl shadow-sky-400/20 disabled:opacity-20 active:scale-95 transition-all"
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
        )}
      </div>
    </div>
  );
}
