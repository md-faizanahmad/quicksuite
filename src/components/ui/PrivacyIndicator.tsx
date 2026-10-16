import { ShieldCheck } from "lucide-react";
import MotionReveal from "@/components/ui/MotionReveal";

interface PrivacyIndicatorProps {
  label?: string;
  detail?: string;
  delay?: number;
}

export default function PrivacyIndicator({
  label = "Private file processing",
  detail = "No cloud uploads",
  delay = 0,
}: PrivacyIndicatorProps) {
  return (
    <MotionReveal delay={delay}>
      <div className="mb-6 inline-flex items-center gap-2 border-y border-border py-2 text-xs font-medium text-foreground/65">
        <ShieldCheck size={15} className="shrink-0 text-primary" />
        <span>{label}</span>
        <span aria-hidden="true" className="mx-1 h-3 w-px bg-border" />
        <span>{detail}</span>
      </div>
    </MotionReveal>
  );
}
