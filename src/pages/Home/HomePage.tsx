import { FileText, Shrink, FileOutput, ScanText } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative mx-auto mb-24 max-w-5xl px-4  text-center ">
        {/* Eyebrow */}
        <div className="mb-8 inline-flex items-center gap-3 border-y border-border py-3">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/65">
            100% Local Processing
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="text-[11px] font-medium text-primary">
            No cloud uploads
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-7 text-6xl font-bold leading-[0.95] tracking-[-0.055em] text-foreground md:text-8xl">
          Tools that
          <br />
          <span className="text-primary">respect your privacy.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
          Merge PDFs, compress files, convert images, and extract text.
          Everything runs directly in your browser, so your files stay on your
          device.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="#tools"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Explore tools
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/how-it-works"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-transparent px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            How it works
          </Link>
        </div>

        {/* Trust note */}
        <p className="mt-7 text-xs leading-5 text-foreground/45">
          Your files are processed locally. Nothing is uploaded to our servers.
        </p>
      </section>

      {/* Grid Section */}

      <section
        id="tools"
        aria-label="Available document tools"
        className="
    mx-auto w-full max-w-6xl
    flex gap-4 overflow-x-auto px-4 pb-4
    snap-x snap-mandatory
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
    sm:px-0
    sm:grid sm:grid-cols-2 sm:gap-5
    sm:overflow-visible sm:pb-0
    lg:grid-cols-3 lg:gap-6
  "
      >
        <div className="w-[82%] shrink-0 snap-start sm:w-auto sm:shrink">
          <ToolCard
            title="QuickReduce"
            desc="Shrink PDFs to 25KB/50KB using local rasterization. Perfect for gov portals."
            icon={<Shrink size={24} />}
            href="/tools/quick-reduce"
            accent="border-primary/20"
          />
        </div>

        <div className="w-[82%] shrink-0 snap-start sm:w-auto sm:shrink">
          <ToolCard
            title="QuickMerge"
            desc="Combine multiple PDFs into one document without a server."
            icon={<FileText size={24} />}
            href="/tools/pdf-merge"
            accent="border-primary/20"
          />
        </div>

        <div className="w-[82%] shrink-0 snap-start sm:w-auto sm:shrink">
          <ToolCard
            title="Image to PDF"
            desc="Convert JPG/PNG to high-quality PDF documents instantly."
            icon={<FileOutput size={24} />}
            href="/tools/image-to-pdf"
            accent="border-primary/20"
          />
        </div>

        <div className="w-[82%] shrink-0 snap-start sm:w-auto sm:shrink">
          <ToolCard
            title="QuickOCR"
            desc="Extract text from images locally using on-device machine learning."
            icon={<ScanText size={24} />}
            href="/tools/quick-ocr"
            accent="border-accent/20"
          />
        </div>
      </section>
    </main>
  );
}
