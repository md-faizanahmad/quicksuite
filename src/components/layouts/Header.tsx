"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "PDF Merge", href: "/tools/pdf-merge" },
    { name: "Quick Reduce", href: "/tools/quick-reduce" },
    { name: "Image To Pdf", href: "/tools/image-to-pdf" },
    { name: "Text Extract", href: "/tools/quick-ocr" },
  ];

  const isActive = (href: string): boolean => {
    if (!pathname) return false;

    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-100 border-b border-foreground/10 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex items-center gap-2.5"
          >
            <span className="  text-primary transition-transform duration-300 group-hover:rotate-12">
              <Zap size={18} fill="currentColor" />
            </span>

            <span className="text-lg font-black uppercase  tracking-tighter">
              Quick
              <span className="text-primary italic tracking-widest">Suite</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 lg:px-4 lg:text-sm ${
                    active
                      ? "text-primary"
                      : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {link.name}

                  <motion.span
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary"
                    initial={false}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    style={{ transformOrigin: "center" }}
                  />

                  <span
                    className={`pointer-events-none absolute inset-0 -z-10  transition-opacity duration-200 ${
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}

            <div className="mx-3 h-5 w-px bg-foreground/10" />
            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              aria-label={
                isMobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center  text-primary transition-colors  "
            >
              <motion.span
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </button>
          </div>
        </div>
      </nav>

      {/* Separate Mobile Navigation Component */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
