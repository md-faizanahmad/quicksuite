"use client";

import OCRWorkspace from "@/features/ocr/OCRWorkspace";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function QuickOCRPage() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
      <section className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6 text-primary"
        >
          <Zap size={12} fill="currentColor" /> Neural Text Extraction
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase"
        >
          QUICK<span className="text-primary italic">OCR.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-foreground/60 max-w-xl mx-auto font-medium text-lg"
        >
          Extract text from images and PDF documents instantly. No data leaves
          your device—everything is processed by local AI.
        </motion.p>
      </section>

      <section className="w-full">
        <OCRWorkspace />
      </section>
    </main>
  );
}
