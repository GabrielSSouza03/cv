import { Section } from "@/components/ui/Section";
import type { Content } from "@/content";
import { formatYearMonth } from "@/lib/date";

type EducationProps = { content: Content; index: number };

export function Education({ content, index }: EducationProps) {
  const { education, nav, locale } = content;

  return (
    <Section id="education" index={index} label={nav.education} heading={education.heading}>
      <ul className="border-t border-ink">
        {education.items.map((item) => (
          <li key={item.id} className="grid gap-3 border-b border-rule py-6 md:grid-cols-9 md:gap-x-6">
            <p className="meta text-ink-muted md:col-span-3">
              {item.completedLabel} <span className="text-ink">{formatYearMonth(item.completed, locale)}</span>
            </p>
            <div className="md:col-span-6">
              <h3 className="font-serif text-[clamp(1.5rem,1.3rem+0.9vw,2.25rem)] leading-tight text-balance">
                {item.institution}
              </h3>
              <p className="mt-2 text-body-lg text-ink-muted">{item.degree}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
