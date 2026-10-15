"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface MergeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MergeSuccessModal({
  isOpen,
  onClose,
}: MergeSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="merge-success-title"
            aria-describedby="merge-success-description"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close success dialog"
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg text-foreground/50 transition-colors hover:bg-background hover:text-foreground"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex size-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                <CheckCircle2 size={29} />
              </div>

              <h2
                id="merge-success-title"
                className="text-xl font-semibold tracking-tight text-foreground"
              >
                PDFs merged successfully
              </h2>

              <p
                id="merge-success-description"
                className="mt-2 max-w-sm text-sm leading-6 text-foreground/60"
              >
                Your merged PDF is ready, and the download has been initiated.
                You can now start another merge.
              </p>

              <button
                type="button"
                onClick={onClose}
                autoFocus
                className="mt-6 min-h-11 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                Merge more PDFs
              </button>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground/55 transition-colors hover:text-foreground"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
