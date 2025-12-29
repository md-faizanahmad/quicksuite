"use client";

import React, { useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import {
  X,
  GripHorizontal,
  Plus,
  Zap,
  Loader2,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";
import { validatePDFSelection } from "@/lib/validation";
import { mergePDFs } from "@/lib/pdf-engine";

interface QueuedFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

type MergeStatus = "idle" | "processing" | "completed";

export default function MergeWorkspace() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [status, setStatus] = useState<MergeStatus>("idle");
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);

  /**
   * INFO: handleUpload processes files 100% client-side.
   * Files are converted to metadata objects for the UI queue.
   */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const error = validatePDFSelection(files.length, incoming);
    if (error) return alert(error);

    const newEntries = incoming.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
    }));
    setFiles((prev) => [...prev, ...newEntries]);
    if (status === "completed") resetWorkspace();
  };

  /**
   * INFO: Clears the generated Blob URL and resets the pipeline state.
   */
  const resetWorkspace = () => {
    if (mergedUrl) URL.revokeObjectURL(mergedUrl);
    setMergedUrl(null);
    setStatus("idle");
  };

  /**
   * INFO: The core engine call. Merges documents using pdf-lib in a web worker/main thread.
   */
  const handleMerge = async () => {
    setStatus("processing");
    try {
      const blob = await mergePDFs(files.map((f) => f.file));
      const url = URL.createObjectURL(blob);
      setMergedUrl(url);
      setStatus("completed");
    } catch (err) {
      console.error("Merge Logic Error:", err);
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8 pb-32 md:pb-12">
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {status === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-green-500">
              <CheckCircle2 size={24} />
              <span className="font-bold text-sm">MERGE READY</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetWorkspace}
                className="p-2 text-foreground/40"
              >
                <RefreshCcw size={18} />
              </button>
              <a
                href={mergedUrl!}
                download="Merged.pdf"
                className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold text-sm"
              >
                DOWNLOAD
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGING AREA (Always visible unless completed) */}
      <div className="relative group">
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleUpload}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="border-2 border-dashed border-primary/20 rounded-3xl p-10 text-center bg-primary/5 hover:border-primary/50 transition-all">
          <Plus className="mx-auto mb-2 text-primary" size={28} />
          <p className="font-bold text-sm dark:text-white light:text-black">
            STAGE DOCUMENTS
          </p>
          <p className="text-[10px] text-foreground/40 uppercase tracking-widest">
            Local Privacy Guaranteed
          </p>
        </div>
      </div>

      {/* QUEUE LIST */}
      <Reorder.Group
        axis="y"
        values={files}
        onReorder={setFiles}
        className="space-y-2"
      >
        <AnimatePresence mode="popLayout">
          {files.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl group"
            >
              <GripHorizontal
                className="text-foreground/10 group-hover:text-primary transition-colors cursor-grab"
                size={20}
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate dark:text-white light:text-black">
                  {item.name}
                </p>
                <p className="text-[10px] font-mono text-foreground/30">
                  {item.size}
                </p>
              </div>
              <button
                onClick={() =>
                  setFiles((f) => f.filter((x) => x.id !== item.id))
                }
                className="text-foreground/20 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* FIXED ACTION BUTTON (Phone Friendly) */}
      <div className=" bottom-6 left-6 right-6 md:relative md:bottom-0 md:left-0 md:right-0 z-50">
        <button
          onClick={handleMerge}
          disabled={
            files.length < 2 ||
            status === "processing" ||
            status === "completed"
          }
          className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all disabled:opacity-20 disabled:shadow-none"
        >
          {status === "processing" ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Zap size={20} fill="black" />
          )}
          <span className="uppercase tracking-tighter italic">
            {status === "processing"
              ? "Merging..."
              : `Merge ${files.length} Documents`}
          </span>
        </button>
      </div>
    </div>
  );
}
