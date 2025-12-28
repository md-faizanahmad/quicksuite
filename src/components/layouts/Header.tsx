"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-linear-to-br from-primary to-accent group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Quick<span className="text-primary">Suite</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/60">
          <Link href="/tools" className="hover:text-primary transition-colors">
            Tools
          </Link>
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="https://github.com"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </nav>

        <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-primary transition-colors">
          Get Started
        </button>
      </div>
    </motion.header>
  );
}
