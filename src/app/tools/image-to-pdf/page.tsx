import ImageToPdfPage from "@/features/image-to-pdf/image-to-pdf";
import MotionReveal from "@/components/ui/MotionReveal";
import PrivacyIndicator from "@/components/ui/PrivacyIndicator";

export default function ImageToPDF() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      {/* Tool Header */}
      <section className="mx-auto mb-12 max-w-4xl text-center">
        <PrivacyIndicator
          label="Private image conversion"
          detail="No cloud uploads"
        />

        <MotionReveal delay={0.08}>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Image to PDF
            <span className="mt-1 block text-primary">
              Simply and securely.
            </span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <p className="mx-auto max-w-xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
            Turn your photos, scans, and gallery images into a single,
            high-quality PDF. Your files are processed directly in your browser.
          </p>
        </MotionReveal>
      </section>

      {/* Main Workspace */}
      <section className="mx-auto w-full max-w-6xl">
        <ImageToPdfPage />
      </section>
    </main>
  );
}
