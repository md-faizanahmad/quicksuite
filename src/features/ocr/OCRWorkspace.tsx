"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Trash2,
  Check,
  Languages,
  FileText,
  Download,
} from "lucide-react";
import { performOCR } from "@/lib/ocr-engine";

export default function OCRWorkspace() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setExtractedText("");
    setProgress(0);

    try {
      const text = await performOCR(file, (p: number) => {
        setProgress(p);
      });
      setExtractedText(text);
    } catch (error) {
      console.error("OCR Error:", error);
      alert(
        "Failed to extract text. Please ensure the document is clear and readable."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "quicksuite-ocr-result.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const reset = () => {
    setExtractedText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8">
      {!extractedText && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative border-2 border-dashed border-border rounded-[2.5rem] p-12 sm:p-20 text-center bg-foreground/2 hover:bg-foreground/5 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <Languages
            className="mx-auto mb-4 opacity-20 group-hover:scale-110 transition-all duration-500"
            size={64}
          />
          <p className="font-black uppercase italic tracking-tight text-xl sm:text-2xl">
            Drop Document
          </p>
          <p className="text-[10px] font-bold opacity-40 uppercase mt-2 tracking-[0.3em]">
            Images & Multi-page PDFs • 100% Local AI
          </p>
        </motion.div>
      )}

      {isProcessing && (
        <div className="flex flex-col items-center justify-center py-20 space-y-8">
          <div className="relative flex items-center justify-center">
            {/* Progress Ring */}
            <svg className="w-32 h-32 transform -rotate-90">
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
          <div className="text-center space-y-1">
            <h3 className="font-black uppercase italic tracking-widest">
              Reading Content
            </h3>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em] animate-pulse">
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
              <div className="flex items-center gap-2 opacity-40">
                <FileText size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Extraction Result
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-foreground/5 rounded-xl hover:bg-primary hover:text-background transition-all font-black text-[10px] uppercase italic"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy Text"}
                </button>
                <button
                  onClick={downloadAsTxt}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-foreground/5 rounded-xl hover:bg-primary hover:text-background transition-all font-black text-[10px] uppercase italic"
                >
                  <Download size={14} /> Export .TXT
                </button>
                <button
                  onClick={reset}
                  className="p-2 bg-foreground/5 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="relative group">
              <textarea
                readOnly
                value={extractedText}
                className="w-full h-[60vh] p-6 sm:p-10 bg-card border border-border rounded-[2.5rem] resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm leading-relaxed font-medium overflow-y-auto custom-scrollbar"
              />
              <div className="absolute bottom-6 right-8 opacity-20 pointer-events-none font-black italic uppercase text-[10px] tracking-widest">
                QuickSuite Local OCR Engine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
