import MergeWorkspace from "@/features/pdf/MergeWorkspace";
import { ShieldCheck } from "lucide-react";
import MotionReveal from "@/components/ui/MotionReveal";

export default function PdfMergePage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <section className="mx-auto mb-12 max-w-4xl text-center">
        <MotionReveal>
          <div className="mb-6 inline-flex items-center gap-2 border-y border-border py-2 text-xs font-medium text-foreground/65">
            <ShieldCheck size={15} className="text-primary" />
            <span>Private PDF processing</span>
            <span className="mx-1 h-3 w-px bg-border" />
            <span>No cloud uploads</span>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Merge PDF files
            <span className="mt-1 block text-primary">
              Simply and securely.
            </span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <p className="mx-auto max-w-xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
            Combine multiple PDF documents into one file. Reorder your pages and
            prepare your final document directly in your browser.
          </p>
        </MotionReveal>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <MergeWorkspace />
      </section>
    </main>
  );
}
