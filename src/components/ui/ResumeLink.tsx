import { ArrowDown } from "lucide-react";
import type { Content } from "@/content";
import { ButtonLink } from "./ButtonLink";

type ResumeLinkProps = {
  resume: Content["resume"];
  variant?: "secondary" | "text";
  compact?: boolean;
  className?: string;
};

export function ResumeLink({ resume, variant = "text", compact = false, className }: ResumeLinkProps) {
  return (
    <ButtonLink
      href={resume.href}
      download={resume.fileName}
      type="application/pdf"
      variant={variant}
      className={className}
      aria-label={compact ? resume.label : undefined}
    >
      {compact ? resume.shortLabel : resume.label}
      <ArrowDown aria-hidden className="size-4" strokeWidth={1.75} />
    </ButtonLink>
  );
}
