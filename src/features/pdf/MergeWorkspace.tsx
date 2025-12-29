"use client";

import React, { useState } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { FileText, X, GripVertical, Plus, Zap, Loader2 } from "lucide-react";
import { validatePDFSelection } from "@/lib/validation";
import { mergePDFs } from "@/lib/pdf-engine";

interface QueuedFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function MergeWorkspace() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
  };

  const handleMerge = async () => {
    setIsProcessing(true);
    try {
      const blob = await mergePDFs(files.map((f) => f.file));
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `QuickSuite_Merged_${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Merge failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Header Action */}
      <div className="flex items-center justify-between sticky top-20 z-30 bg-background/80 backdrop-blur py-4">
        <span className="text-xs font-black tracking-widest text-foreground/30 uppercase">
          Queue: {files.length} / 15
        </span>
        {files.length >= 2 && (
          <button
            onClick={handleMerge}
            disabled={isProcessing}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold rounded-xl hover:shadow-[0_0_25px_rgba(var(--color-primary),0.5)] disabled:opacity-50 transition-all"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Zap size={18} fill="currentColor" />
            )}
            {isProcessing ? "PROCESSING..." : "GENERATE MERGED PDF"}
          </button>
        )}
      </div>

      {/* Upload Zone */}
      <div className="relative border-2 border-dashed border-foreground/10 rounded-3xl p-12 hover:border-primary/40 bg-card/30 transition-colors text-center">
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <Plus className="mx-auto mb-4 text-primary" size={40} />
        <p className="font-bold text-lg">Add PDF Documents</p>
        <p className="text-sm text-foreground/40">
          Files stay local to your browser
        </p>
      </div>

      {/* Reorderable List */}
      <Reorder.Group
        axis="y"
        values={files}
        onReorder={setFiles}
        className="space-y-3"
      >
        <AnimatePresence>
          {files.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-4 p-5 bg-card border border-foreground/5 rounded-2xl group cursor-default"
            >
              <GripVertical
                className="text-foreground/20 cursor-grab active:cursor-grabbing"
                size={20}
              />
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText size={20} />
              </div>
              <div className="flex-1 truncate pr-4">
                <p className="font-bold text-sm truncate">{item.name}</p>
                <p className="text-[10px] text-foreground/40 uppercase font-medium">
                  {item.size}
                </p>
              </div>
              <button
                onClick={() =>
                  setFiles((f) => f.filter((x) => x.id !== item.id))
                }
                className="text-foreground/20 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
