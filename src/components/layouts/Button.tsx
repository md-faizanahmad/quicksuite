"use client";
import { Download } from "lucide-react";

export default function ButtonFooter() {
  return (
    <li className="font-black  text-sm uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mx-auto md:mx-0">
      <button
        onClick={() => window.dispatchEvent(new Event("beforeinstallprompt"))}
        className="flex items-center justify-center md:justify-start gap-2 text-primary uppercase italic tracking-tighter hover:opacity-80 transition-opacity"
      >
        <Download size={14} /> Install Suite
      </button>
    </li>
  );
}
