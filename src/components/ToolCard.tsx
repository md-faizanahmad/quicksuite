"use client";

import { ToolCardProps } from "@/@types/toolCardType";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function ToolCard({
  title,
  desc,
  icon,
  href,
  accent,
}: ToolCardProps) {
  // Logic to determine shadow color based on the accent prop
  const shadowClass = accent.includes("primary")
    ? "group-hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.5)]"
    : "group-hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)]";

  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        className={`h-full p-6 rounded-4xl bg-card/80 backdrop-blur-3xl border border-border transition-all duration-300 ${shadowClass}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-primary/10  border border-primary/10">
            {icon}
          </div>
          <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border hidden group-hover:block transition-all">
            <span className="text-[9px] font-black  uppercase italic">
              Local AI
            </span>
          </div>
        </div>

        {/* Text colors: Black for Light Mode, White for Dark Mode */}
        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2  transition-colors">
          {title}
        </h3>

        <p className="text-xs font-medium leading-relaxed mb-6 transition-colors line-clamp-2">
          {desc}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-primary" fill="currentColor" />
            <span className="text-[10px] font-black uppercase  tracking-widest">
              Secure
            </span>
          </div>
          <ArrowRight
            size={18}
            className="text-primary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
          />
        </div>
      </motion.div>
    </Link>
  );
}
