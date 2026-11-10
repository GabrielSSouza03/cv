import type { ReactNode } from "react";
import type { SectionId } from "@/content";

type SectionProps = {
  id: SectionId;
  index: number;
  label: string;
  heading: string;
  tone?: "default" | "tinted";
  children?: ReactNode;
};

export function Section({ id, index, label, heading, tone = "default", children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={tone === "tinted" ? "bg-paper-2" : undefined}>
      <div className="container-page">
        <div className="grid gap-y-8 border-t border-ink pt-6 pb-[clamp(5rem,10vw,9rem)] lg:grid-cols-12 lg:gap-x-6">
          <p className="meta text-ink-muted lg:sticky lg:top-24 lg:col-span-3 lg:self-start">
            <span className="text-ink">{String(index).padStart(2, "0")}</span>
            <span aria-hidden> — </span>
            {label}
          </p>
          <div className="lg:col-span-9">
            <h2 id={headingId} className="reveal max-w-[20ch] font-serif text-h2 text-balance">
              {heading}
            </h2>
            {children ? <div className="reveal mt-10 lg:mt-14">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
