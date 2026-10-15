"use client";

import { ToolCardProps } from "@/@types/toolCardType";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ToolCard({ title, desc, icon, href }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[200px] flex-col rounded-lg border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/50 hover:bg-foreground/[0.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
    >
      {/* Icon and action */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          strokeWidth={1.7}
          className="text-foreground/40 transition-colors group-hover:text-primary"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-foreground/60">
          {desc}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-xs font-medium text-foreground/55">
          Process locally
        </span>
      </div>
    </Link>
  );
}
