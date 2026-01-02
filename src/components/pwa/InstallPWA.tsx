"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Zap, ShieldCheck } from "lucide-react";

/**
 * Standard interface for the Chrome PWA Install event
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent browser from showing default prompt
      e.preventDefault();
      // Store event and show custom UI
      setInstallPrompt(e as BeforeInstallPromptEvent);

      const isDismissed = sessionStorage.getItem("pwa-prompt-dismissed");
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setInstallPrompt(null);
      setIsVisible(false);
    }
  };

  const dismissPrompt = () => {
    setIsVisible(false);
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-100"
        >
          <div className="bg-background border border-border p-6 rounded-4xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Aesthetic Glow using Theme Variables */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none" />

            <button
              onClick={dismissPrompt}
              className="absolute top-4 right-4 opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                <Zap
                  size={24}
                  fill="currentColor"
                  className="text-background"
                />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">
                  Install <span className="text-primary">QuickSuite</span>
                </h3>
                <p className="text-xs font-medium opacity-60 leading-relaxed mt-1">
                  Use all tools offline and securely directly from your home
                  screen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40">
                <ShieldCheck size={12} className="text-primary" /> 100% Offline
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40">
                <Zap size={12} className="text-primary" /> Instant Load
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="w-full py-4 bg-primary text-background font-black uppercase italic rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all hover:opacity-90"
            >
              <Download size={18} />
              Install as App
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
