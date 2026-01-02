"use client";

import ImageToPdfPage from "@/features/image-to-pdf/image-to-pdf";
import { motion } from "framer-motion";
import { ImageIcon, ShieldCheck, Zap } from "lucide-react";

export default function ImageToPDF() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
      {/* Tool Header Section */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6 text-primary"
        >
          <Zap size={12} fill="currentColor" />
          Zero-Server Conversion
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase"
        >
          QUICK<span className="text-primary italic">IMAGE TO PDF.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-foreground/60 max-w-xl mx-auto font-medium text-lg"
        >
          Instantly transform your photos, scans, and gallery images into a
          single, high-quality PDF. Everything happens locally on your device.
        </motion.p>
      </section>

      {/* Main Workspace Component */}
      <section className="w-full">
        <ImageToPdfPage />
      </section>

      {/* Security Footer Note */}
      <footer className="mt-16 flex items-center gap-6 opacity-30">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">
            End-to-End Private
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ImageIcon size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">
            No Cloud Upload
          </span>
        </div>
      </footer>
    </main>
  );
}
