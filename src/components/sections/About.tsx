import Image from "next/image";
import portrait from "@/assets/gabriel-simoes.jpg";
import { Section } from "@/components/ui/Section";
import type { Content } from "@/content";

type AboutProps = { content: Content; index: number };

export function About({ content, index }: AboutProps) {
  const { about, nav } = content;
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section id="about" index={index} label={nav.about} heading={about.heading}>
      <div className="grid gap-12 md:grid-cols-9 md:gap-x-6">
        <figure className="max-w-72 md:col-span-3 md:max-w-none">
          <div className="group relative aspect-[4/5] overflow-hidden border border-rule bg-paper-2">
            <Image
              src={portrait}
              alt={about.portrait.alt}
              placeholder="blur"
              sizes="(min-width: 1320px) 290px, (min-width: 768px) 25vw, 288px"
              className="size-full object-cover grayscale contrast-[1.08] transition-[filter] duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100"
            />
          </div>
          <figcaption className="meta mt-3 flex items-center gap-2 text-ink-muted">
            <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
            {about.portrait.caption}
          </figcaption>
        </figure>

        <div className="md:col-span-6">
          {lead ? <p className="text-body-lg text-ink">{lead}</p> : null}
          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-6 max-w-[62ch] leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ))}

          <dl className="mt-12 border-t border-rule pt-4">
            <dt className="meta text-ink-muted">{about.focusLabel}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {about.focus.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.9375rem]">
                    <span aria-hidden className="size-1 bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </Section>
  );
}
