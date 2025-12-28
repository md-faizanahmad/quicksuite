"use client";

import React, { useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { FileText, X, GripVertical, Plus, Zap } from "lucide-react";

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function MergeWorkspace() {
  const [files, setFiles] = useState<PDFFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <section className="max-w-4xl mx-auto mt-12 p-6">
      {/* Upload Zone */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative group border-2 border-dashed border-foreground/10 rounded-3xl p-12 text-center bg-card hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
            <Plus size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Drop PDFs here</h3>
            <p className="text-foreground/50">or click to browse locally</p>
          </div>
        </div>
      </motion.div>

      {/* File List / Reorderable Area */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground/40">
            Merge Queue ({files.length})
          </h2>
          {files.length > 1 && (
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(var(--color-primary),0.4)] transition-all">
              <Zap size={16} fill="currentColor" />
              MERGE FILES
            </button>
          )}
        </div>

        <Reorder.Group
          axis="y"
          values={files}
          onReorder={setFiles}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {files.map((file) => (
              <Reorder.Item
                key={file.id}
                value={file}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-4 p-4 bg-card border border-foreground/5 rounded-2xl group active:cursor-grabbing"
              >
                <GripVertical
                  size={20}
                  className="text-foreground/20 cursor-grab"
                />
                <div className="p-2 rounded-lg bg-foreground/5">
                  <FileText size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{file.name}</p>
                  <p className="text-xs text-foreground/40">{file.size}</p>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {files.length === 0 && (
          <div className="text-center py-20 border border-foreground/5 rounded-3xl bg-foreground/[0.02]">
            <p className="text-foreground/20 italic">
              No files selected for processing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
