import MergeWorkspace from "@/features/pdf/MergeWorkspace";

export default function PdfMergePage() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          QUICK<span className="text-primary">PDF</span> MERGE
        </h1>
        <p className="text-foreground/60 max-w-lg mx-auto">
          Reorder and combine your PDF documents in seconds. The processing
          happens entirely in your browser.
        </p>
      </div>
      <MergeWorkspace />
    </main>
  );
}
