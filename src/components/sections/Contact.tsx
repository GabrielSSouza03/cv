import { ArrowUpRight } from "lucide-react";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { Section } from "@/components/ui/Section";
import { person, type Content } from "@/content";

type ContactProps = { content: Content; index: number };

export function Contact({ content, index }: ContactProps) {
  const { contact, nav, resume, a11y } = content;
  const elsewhere = [
    { label: "LinkedIn", href: person.links.linkedin },
    { label: "GitHub", href: person.links.github },
  ];

  return (
    <Section id="contact" index={index} label={nav.contact} heading={contact.heading} tone="tinted">
      <p className="max-w-[52ch] text-body-lg text-ink-muted">{contact.lead}</p>

      <div className="mt-12">
        <p className="meta text-ink-muted">{contact.emailLabel}</p>
        <a
          href={`mailto:${person.email}`}
          className="mt-3 inline-block border-b border-ink bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:0%_2px] bg-bottom-left bg-no-repeat pb-1 text-[clamp(1.25rem,0.6rem+3.6vw,3.25rem)] font-medium tracking-tight break-all transition-[background-size,color] duration-300 hover:bg-[length:100%_2px] hover:text-accent-ink"
        >
          {person.email}
        </a>
      </div>

      <div className="mt-14 grid gap-6 border-t border-rule pt-6 sm:grid-cols-2 md:grid-cols-9 md:gap-x-6">
        <div className="md:col-span-3">
          <p className="meta text-ink-muted">{contact.elsewhereLabel}</p>
          <ul className="mt-2">
            {elsewhere.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 text-body-lg transition-colors hover:text-accent-ink"
                >
                  {label}
                  <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                  <span className="sr-only"> {a11y.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6">
          <p className="meta text-ink-muted">{resume.shortLabel}</p>
          <ResumeLink resume={resume} variant="secondary" className="mt-3" />
        </div>
      </div>
    </Section>
  );
}
