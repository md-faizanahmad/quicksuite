"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface ReduceResultPanelProps {
  error: string | null;
}

export default function ReduceResultPanel({ error }: ReduceResultPanelProps) {
  return (
    <div className="space-y-5">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 border border-red-500/25 bg-red-500/5 p-4"
            role="alert"
          >
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm leading-6 text-foreground">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-2 border-t border-border pt-4 text-xs text-foreground/50">
        <CheckCircle2 size={14} className="text-primary" />
        <span>Files are processed locally in your browser.</span>
      </div>
    </div>
  );
}
