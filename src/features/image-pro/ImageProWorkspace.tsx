"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Sparkles,
  Download,
  Loader2,
  ImageIcon,
  RefreshCcw,
} from "lucide-react";
import { processBackgroundRemoval } from "@/lib/image-pro-engine";
import Image from "next/image";

export default function ImageProWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null
  );
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (image?.preview) URL.revokeObjectURL(image.preview);
      setImage({ file: f, preview: URL.createObjectURL(f) });
      setResult(null);
    }
  };

  const onRemoveBG = async () => {
    if (!image) return;
    setIsProcessing(true);
    try {
      const blob = await processBackgroundRemoval(image.file, (task, p) => {
        setCurrentTask(task);
        setProgress(p);
      });
      setResult(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      alert(
        "AI Engine failed. Make sure model files are in /public/workers/imgly/"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result);
    setImage(null);
    setResult(null);
    setIsProcessing(false);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-32">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black dark:text-white mb-2">
          Image<span className="text-accent">Pro</span>
        </h1>
        <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase opacity-80">
          Neural Background Removal • Offline & Private
        </p>
      </div>

      {!image ? (
        <div className="relative border-2 border-dashed border-primary/20 rounded-[2.5rem] p-16 text-center bg-primary/5 hover:bg-primary/10 transition-all group overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <ImageIcon
            className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-500"
            size={48}
          />
          <p className="font-black text-black dark:text-white uppercase italic tracking-tight">
            Drop image to start AI engine
          </p>
          <p className="text-[10px] text-foreground/40 mt-2 uppercase font-bold tracking-widest">
            Supports JPG, PNG, WEBP
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl flex items-center justify-center p-4">
            {/* Checkerboard background for transparency preview */}
            {result && (
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "conic-gradient(#888 25%, #eee 0 50%, #888 0 75%, #eee 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            )}

            <Image
              height={50}
              width={50}
              src={result || image.preview}
              className="relative z-10 max-w-full max-h-full object-contain rounded-xl"
              alt="Preview"
            />

            {isProcessing && (
              <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <p className="font-black text-black dark:text-white italic uppercase tracking-widest text-sm mb-1">
                  {currentTask}
                </p>
                <p className="text-4xl font-black text-primary">{progress}%</p>
              </div>
            )}

            <button
              onClick={reset}
              className="absolute top-6 right-6 z-30 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-3">
            {!result ? (
              <button
                onClick={onRemoveBG}
                disabled={isProcessing}
                className="flex-1 py-5 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-3"
              >
                <Sparkles size={20} fill="black" />
                <span className="uppercase italic tracking-tighter">
                  Remove Background
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setResult(null)}
                  className="p-5 bg-white/5 border border-border text-black dark:text-white rounded-2xl hover:bg-white/10 transition-all"
                >
                  <RefreshCcw size={20} />
                </button>
                <a
                  href={result}
                  download="quicksuite-removed.png"
                  className="flex-1 py-5 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Download size={20} />
                  <span className="uppercase italic tracking-tighter font-black">
                    Download PNG
                  </span>
                </a>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
