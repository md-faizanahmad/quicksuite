"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="relative inline-block">
          <AlertCircle size={80} className=" mx-auto opacity-20" />
          <h1 className="text-9xl font-black italic tracking-tighter absolute inset-0 flex items-center justify-center opacity-10">
            404
          </h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            System <span className="">Error.</span>
          </h2>
          <p className="text-foreground/50 font-bold uppercase text-xs tracking-[0.3em]">
            Requested resource is offline or missing
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2  bg-primary  px-8 py-4 rounded-2xl font-black uppercase italic tracking-tighter  transition-all active:scale-95"
        >
          <Home size={20} /> Return to Dashboard
        </Link>
      </motion.div>
    </main>
  );
}
