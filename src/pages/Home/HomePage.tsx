"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Shrink,
  Zap,
  FileOutput,
  ScanText,
  Info,
} from "lucide-react";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-24 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
        >
          <Zap size={12} fill="currentColor" /> 100% Client-Side Processing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] text-foreground"
        >
          TOOLS THAT <br />
          <span className="text-primary italic">RESPECT DATA.</span>
        </motion.h1>

        <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          Stop uploading sensitive files to random servers. QuickSuite runs
          industrial-grade engines directly in your browser.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#tools"
            className="px-10 py-4 bg-primary text-black font-black uppercase italic tracking-tighter rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            Explore Tools
          </Link>
          <Link
            href="/how-it-works"
            className="px-10 py-4 bg-foreground/5 border border-border font-black uppercase italic tracking-tighter rounded-2xl hover:bg-foreground/10 transition-all flex items-center justify-center gap-2"
          >
            <Info size={18} /> How it works
          </Link>
        </div>
      </section>

      {/* Grid Section */}
      <section
        id="tools"
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ToolCard
          title="QuickReduce"
          desc="Shrink PDFs to 25KB/50KB using local rasterization. Perfect for gov portals."
          icon={<Shrink size={24} />}
          href="/tools/quick-reduce"
          accent="border-primary/20"
        />
        <ToolCard
          title="QuickMerge"
          desc="Combine multiple PDFs into one document without a server."
          icon={<FileText size={24} />}
          href="/tools/pdf-merge"
          accent="border-primary/20"
        />
        {/* <ToolCard
          title="QuickImage Pro"
          desc="Local AI background removal. No data ever leaves your device."
          icon={<ImageIcon size={24} />}
          href="/tools/image-pro"
          accent="border-accent/20"
        /> */}
        <ToolCard
          title="Image to PDF"
          desc="Convert JPG/PNG to high-quality PDF documents instantly."
          icon={<FileOutput size={24} />}
          href="/tools/image-to-pdf"
          accent="border-primary/20"
        />
        <ToolCard
          title="QuickOCR"
          desc="Extract text from images locally using on-device machine learning."
          icon={<ScanText size={24} />}
          href="/tools/quick-ocr"
          accent="border-accent/20"
        />
      </section>
    </main>
  );
}
