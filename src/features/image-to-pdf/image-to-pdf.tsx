"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  FileOutput,
  Download,
  X,
  ImageIcon,
  Loader2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { convertImagesToPdf } from "@/lib/image-to-pdf-engine";

export default function ImageToPdfPage() {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    setPdfUrl(null);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfUrl(null);
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setImages([]);
    setPdfUrl(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    try {
      const blob = await convertImagesToPdf(images.map((img) => img.url));
      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 w-full">
      <div className="flex justify-between items-end mb-10">
        {images.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
          >
            <Trash2 size={14} /> Clear All
          </button>
        )}
      </div>

      {!images.length ? (
        <div className="relative border-2 border-dashed border-border rounded-[2.5rem] p-20 text-center bg-foreground/2 hover:bg-foreground/5 transition-all group">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <ImageIcon
            className="mx-auto mb-4 opacity-20 group-hover:scale-110 transition-all"
            size={64}
          />
          <p className="font-black uppercase italic tracking-tight text-xl">
            Upload Images
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-3/4 rounded-2xl overflow-hidden border border-border bg-card shadow-sm"
                >
                  <Image
                    src={img.url}
                    fill
                    className="object-cover"
                    alt="preview"
                    unoptimized
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors z-20"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <label className="relative aspect-3/4 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-foreground/2 transition-all">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              <Plus size={24} className="opacity-40" />
              <span className="text-[10px] font-black uppercase mt-2">
                Add More
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!pdfUrl ? (
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span className="uppercase italic tracking-tighter">
                      Converting {images.length} Pages...
                    </span>
                  </>
                ) : (
                  <>
                    <FileOutput size={20} />
                    <span className="uppercase italic tracking-tighter">
                      Convert to PDF
                    </span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row w-full gap-3">
                <button
                  onClick={() => setPdfUrl(null)}
                  className="px-8 py-5 bg-foreground/5 border border-border rounded-2xl font-black uppercase italic"
                >
                  Edit Images
                </button>
                <a
                  href={pdfUrl}
                  download="quicksuite-converted.pdf"
                  className="flex-1 py-5 bg-green-500 text-white font-black rounded-2xl shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 animate-pulse"
                >
                  <Download size={20} />
                  <span className="uppercase italic tracking-tighter">
                    Download PDF
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
