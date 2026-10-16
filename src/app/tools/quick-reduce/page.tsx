import ReduceWorkspace from "@/features/reduce/ReduceWorkspace";
import MotionReveal from "@/components/ui/MotionReveal";
import PrivacyIndicator from "@/components/ui/PrivacyIndicator";

export default function QuickReducePage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <section className="mx-auto mb-12 max-w-4xl text-center">
        <PrivacyIndicator
          label="Private file processing"
          detail="No cloud uploads"
        />

        <MotionReveal delay={0.08}>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Reduce PDF size
            <span className="mt-1 block text-primary">Without the hassle.</span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <p className="mx-auto max-w-xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
            Compress PDFs to meet strict file-size limits for applications,
            online forms, and document uploads. Adjust the output size and
            process your files directly in your browser.
          </p>
        </MotionReveal>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <ReduceWorkspace />
      </section>
    </main>
  );
}
