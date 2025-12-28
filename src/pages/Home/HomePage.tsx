"use client";
import { ToolCardProps } from "@/@types/toolCardType";
import { motion } from "framer-motion";
import { FileText, ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pt-32 pb-20 px-6">
      <section className="max-w-5xl mx-auto text-center mb-20">
        <motion.h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
          TOOLS THAT <br />
          <span className="text-primary">RESPECT DATA.</span>
        </motion.h1>
        <p className="text-foreground/60 text-xl max-w-2xl mx-auto mb-12">
          Stop uploading sensitive files to random servers. QuickSuite brings
          industrial-grade PDF and Image processing directly to your browser’s
          local engine.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-primary text-black font-bold rounded-lg hover:scale-105 transition-transform">
            Explore Tools
          </button>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolCard
          title="QuickPDF Merge"
          desc="Combine multiple PDF files into one high-quality document instantly."
          icon={<FileText className="text-primary" size={32} />}
          href="/tools/pdf-merge"
          accent="border-primary/20"
        />
        <ToolCard
          title="QuickImage Pro"
          desc="Remove backgrounds and optimize images using local AI models."
          icon={<ImageIcon className="text-accent" size={32} />}
          href="/tools/image-pro"
          accent="border-accent/20"
        />
      </section>
    </main>
  );
}
const ToolCard = ({ title, desc, icon, href, accent }: ToolCardProps) => (
  <Link href={href} className="group">
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`h-full p-8 rounded-3xl bg-card border ${accent} hover:shadow-[0_0_30px_-10px_var(--color-primary)] transition-all`}
    >
      <div className="mb-6 p-3 w-fit rounded-2xl bg-background border border-foreground/5">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-foreground/50 leading-relaxed mb-8">{desc}</p>
      <div className="flex items-center gap-2 text-sm font-bold text-sky-500 italic">
        LAUNCH WORKSPACE{" "}
        <ArrowRight
          size={16}
          className="group-hover:translate-x-2 transition-transform"
        />
      </div>
    </motion.div>
  </Link>
);
