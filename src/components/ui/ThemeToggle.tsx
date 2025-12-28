"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-all active:scale-95"
      aria-label="Toggle theme"
    >
      {/* We use an opacity wrapper instead of a conditional return 
         to keep the DOM structure identical between Server and Client.
      */}
      <div className={mounted ? "opacity-100" : "opacity-0"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "dark" : "light"}
            initial={{ scale: 0.5, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2, ease: "backOut" }}
          >
            {isDark ? (
              <Sun size={18} className="text-primary" />
            ) : (
              <Moon size={18} className="text-accent" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
}
