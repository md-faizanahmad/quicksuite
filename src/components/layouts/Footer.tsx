import { Mail, ExternalLink, Shield, Zap } from "lucide-react";
import ButtonFooter from "./Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yourEmail = "md.faizan.ahmad.web@gmail.com";

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Zap
                  size={20}
                  fill="currentColor"
                  className="text-background"
                />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic">
                Quick<span className="text-primary">Suite</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-sm font-medium opacity-70">
              Industrial-grade file tools built for the Quick Community. Data
              never leaves your device.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mx-auto md:mx-0">
              Other Free Tools
            </h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <a
                  href="https://quicktrack-navy.vercel.app"
                  target="_blank"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>QuickTrack (Expense)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://quickinvoices.vercel.app/"
                  target="_blank"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>QuickInvoice (Invoice)</span>
                </a>
              </li>
              <li>
                <ButtonFooter />
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest">
              Support
            </h4>
            <a
              href={`mailto:${yourEmail}`}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-bold transition-all hover:bg-primary w-fit text-sm"
            >
              <Mail size={16} /> Email Developer
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-primary" />
              <span>No-Cloud-Upload</span>
            </div>
            <span>© {currentYear} Quick Community</span>
          </div>
          <p>Built for absolute privacy.</p>
        </div>
      </div>
    </footer>
  );
}
