import OCRWorkspace from "@/features/ocr/OCRWorkspace";
import MotionReveal from "@/components/ui/MotionReveal";
import PrivacyIndicator from "@/components/ui/PrivacyIndicator";

export default function QuickOCRPage() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-20 sm:px-6 sm:pt-32">
      <section className="mx-auto mb-12 max-w-4xl text-center">
        <PrivacyIndicator
          label="Private text extraction"
          detail="Files stay on your device"
        />

        <MotionReveal delay={0.08}>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Quick<span className="text-primary">OCR.</span>
            <span className="mt-1 block text-primary">Text, extracted.</span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <p className="mx-auto max-w-xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
            Extract text from images and PDF documents. Your files are processed
            locally on your device.
          </p>
        </MotionReveal>
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <OCRWorkspace />
      </section>
    </main>
  );
}
