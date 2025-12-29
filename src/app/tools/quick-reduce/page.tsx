import ReduceWorkspace from "@/features/reduce/ReduceWorkspace";

export default function QuickReducePage() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase italic">
          Quick<span className="text-primary">Reduce</span>
        </h1>
        <p className="text-foreground/60 max-w-lg mx-auto text-sm">
          Compress PDFs and Images to strict size limits without uploading a
          single byte to a server.
        </p>
      </div>
      <ReduceWorkspace />
    </main>
  );
}
