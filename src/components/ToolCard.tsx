"use client";

import { ToolCardProps } from "@/@types/toolCardType";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ToolCard({ title, desc, icon, href }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-50 flex-col overflow-hidden rounded-sm border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:bg-foreground/2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
    >
      {/* Background icon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 top-8 text-primary/[0.07] transition-all duration-300 group-hover:scale-110 group-hover:text-primary/12"
      >
        <div className="[&>svg]:size-32 [&>svg]:stroke-[0.8]">{icon}</div>
      </div>

      {/* Local processing indicator */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5  text-[11px] font-medium text-foreground/60 backdrop-blur-sm">
          <ShieldCheck size={15} className="text-primary" />
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={1.7}
          className="text-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
        />
      </div>

      {/* Main icon */}
      {/* <div className="relative mb-4 flex size-11 items-center justify-center rounded-md border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors group-hover:border-primary/30 group-hover:text-primary">
        {icon}
      </div> */}

      {/* Content */}
      <div className="relative flex flex-1 flex-col">
        <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-foreground/60">
          {desc}
        </p>
      </div>

      {/* Footer */}
    </Link>
  );
}
