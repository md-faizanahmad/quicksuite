export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-foreground/40">
          © {new Date().getFullYear()} Quick Community. Privacy-first by design.
        </p>
        <div className="flex gap-6 text-xs font-mono uppercase tracking-widest text-foreground/40">
          <span>100% Client-Side</span>
          <span>Open Source</span>
        </div>
      </div>
    </footer>
  );
}
