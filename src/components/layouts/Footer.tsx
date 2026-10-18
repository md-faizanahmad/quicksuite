import {
  Mail,
  ExternalLink,
  Shield,
  Zap,
  Github,
  Linkedin,
} from "lucide-react";
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
              <div className="text-accent flex items-center justify-center">
                <Zap size={20} fill="currentColor" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic">
                Quick<span className="text-primary tracking-widest">Suite</span>
              </h3>
            </div>

            <p className="text-sm leading-relaxed max-w-sm font-medium opacity-70">
              Free and open source tools for everyone. No subscriptions, no ads,
              and no data tracking. Your files stay on your device, giving you
              complete privacy and control.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest border-b-2 border-primary w-fit pb-1 mx-auto md:mx-0">
              Other Free Tools
            </h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <a
                  href="https://offline-tracker-tawny.vercel.app"
                  target="_blank"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Offline Track</span>
                </a>
              </li>
              <li>
                <a
                  href="https://offline-invoice.vercel.app"
                  target="_blank"
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Offline Invoice </span>
                </a>
              </li>

              <ButtonFooter />
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest">
              Support
            </h4>

            <div className="flex items-center gap-4">
              <a
                href={`mailto:${yourEmail}`}
                aria-label="Email Developer"
                className="text-foreground/60 transition-colors hover:text-primary"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://github.com/md-faizanahmad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-foreground/60 transition-colors hover:text-primary"
              >
                <Github size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/mdfaizanahmad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-foreground/60 transition-colors hover:text-primary"
              >
                <Linkedin size={18} />
              </a>
            </div>
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
