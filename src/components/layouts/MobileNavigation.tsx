"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  name: string;
  href: string;
};

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
};

export default function MobileNavigation({
  isOpen,
  onClose,
  navLinks,
}: MobileNavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (!pathname) return false;

    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-90 bg-black/50 backdrop-blur-[2px] md:hidden"
          />

          {/* Bottom Drawer */}
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 34,
              mass: 0.8,
            }}
            className="fixed inset-x-0 bottom-0 z-95 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-foreground/10 bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl md:hidden"
          >
            {/* Drawer Handle */}
            <div className="flex justify-center pb-3 pt-3">
              <span className="h-1 w-10 rounded-full bg-foreground/20" />
            </div>

            <div className="px-5 pb-4">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Navigation
                  </p>
                  <h2 className="mt-1 text-xl font-black tracking-tight">
                    Explore QuickSuite
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label="Close navigation"
                  onClick={onClose}
                  className="rounded-full border border-foreground/10 p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-primary"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const active = isActive(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.045,
                        duration: 0.22,
                      }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        onClick={onClose}
                        className={`group flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-200 ${
                          active
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-transparent text-foreground/75 hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full transition-colors ${
                              active
                                ? "bg-primary"
                                : "bg-foreground/20 group-hover:bg-primary"
                            }`}
                          />

                          <span className="text-sm font-bold tracking-wide">
                            {link.name}
                          </span>
                        </span>

                        <ArrowUpRight
                          size={17}
                          className={`transition-all duration-200 ${
                            active
                              ? "translate-x-0 text-primary"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-foreground/10 pt-4">
                <span className="text-xs font-medium text-foreground/45">
                  Your files. Your device.
                </span>
                <span className="text-xs font-bold text-primary">
                  QuickTool
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
