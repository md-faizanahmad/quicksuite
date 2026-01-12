"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  WifiOff,
  HardDrive,
  Zap,
  FileJson,
  Lock,
  Languages,
  EyeOff,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <WifiOff className="text-primary" size={24} />,
      title: "100% Offline Processing",
      desc: "Once QuickSuite loads, the connection is no longer needed. You can process sensitive documents in Airplane Mode without any data leaks.",
    },
    {
      icon: <Cpu className="text-primary" size={24} />,
      title: "Client-Side WASM Engine",
      desc: "We use WebAssembly to run industrial-grade C++ logic directly in your browser RAM. Your CPU does the work, not a remote server.",
    },
    {
      icon: <Languages className="text-primary" size={24} />,
      title: "Neural OCR Engine",
      desc: "Our text extraction uses a local neural network to read images and PDFs. AI-powered character recognition without sending pixels to the cloud.",
    },
    {
      icon: <HardDrive className="text-primary" size={24} />,
      title: "Installable Desktop App",
      desc: "As a Progressive Web App (PWA), you can install QuickSuite on Windows, Mac, or Mobile for instant access to tools even without internet.",
    },
  ];

  return (
    <main className="pt-32 pb-32 px-6 max-w-5xl mx-auto">
      {/* SEO Header Section */}
      <header className="mb-20 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
        >
          <Lock size={12} fill="currentColor" /> Secure Local Processing
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-8 tracking-tighter leading-[0.9]">
          How we <span className="text-primary">Protect & Process</span> Your
          Data.
        </h1>

        <p className="text-xl opacity-70 max-w-3xl font-medium leading-relaxed">
          Standard tools upload your PDFs and Images to their servers, exposing
          your identity. QuickSuite uses **Edge Computing** to convert, reduce,
          extract, and merge files inside your browser.
        </p>
      </header>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-2 gap-4 mb-24">
        {steps.map((step, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-default p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/30 transition-all duration-500"
          >
            <div className="p-4 rounded-2xl bg-primary/10 w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
              {step.icon}
            </div>
            <h3 className="text-2xl font-black uppercase italic mb-3 tracking-tight">
              {step.title}
            </h3>
            <p className="opacity-50 font-bold text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.article>
        ))}
      </section>

      {/* Detailed Tech Section */}
      <section className="bg-foreground/3 rounded-[3rem] p-10 md:p-16 border border-border">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">
              The <span className="text-primary">Engine</span> Details
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <Zap className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm italic">
                    Smart Rasterization
                  </h4>
                  <p className="text-xs font-bold opacity-40 mt-1">
                    Our reduction engine turns PDF vectors into optimized pixels
                    to guarantee size targets like 25KB or 50KB.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <EyeOff className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm italic">
                    Neural OCR
                  </h4>
                  <p className="text-xs font-bold opacity-40 mt-1">
                    Extract text from scanned receipts and IDs using Tesseract
                    WASM. No image data is ever cached or sent to a third party.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <FileJson className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm italic">
                    In-Memory Structuring
                  </h4>
                  <p className="text-xs font-bold opacity-40 mt-1">
                    Files are held as temporary Blobs in RAM. Once you save or
                    close the tab, the memory is wiped by the browser garbage
                    collector.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-4xl bg-primary text-background">
            <h3 className="text-xl font-black uppercase italic mb-4">
              Why use local tools?
            </h3>
            <ul className="space-y-4 font-bold text-sm italic tracking-tight">
              <li className="flex items-center gap-3">
                ✓ No subscription or daily limits
              </li>
              <li className="flex items-center gap-3">
                ✓ Works on low-bandwidth internet
              </li>
              <li className="flex items-center gap-3">
                ✓ Safest for Government Documents
              </li>
              <li className="flex items-center gap-3">
                ✓ Instant download (No server wait)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to process files offline with QuickSuite",
            description:
              "Learn how to reduce PDF size, extract text (OCR), and remove backgrounds locally in your browser.",
            step: [
              {
                "@type": "HowToStep",
                text: "Select your file (PDF, Image) for local staging.",
              },
              {
                "@type": "HowToStep",
                text: "Configure parameters (Target size, OCR language, or Merge order).",
              },
              {
                "@type": "HowToStep",
                text: "Download the resulting file directly from your device memory.",
              },
            ],
          }),
        }}
      />
    </main>
  );
}
