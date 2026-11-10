import { Section } from "@/components/ui/Section";
import { InlineList } from "@/components/ui/TechList";
import type { Content } from "@/content";

type SkillsProps = { content: Content; index: number };

export function Skills({ content, index }: SkillsProps) {
  const { skills, nav } = content;

  return (
    <Section id="skills" index={index} label={nav.skills} heading={skills.heading}>
      <p className="max-w-[56ch] text-body-lg text-ink-muted">{skills.intro}</p>

      <div className="mt-12 border-b border-rule">
        {skills.groups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`skills-${group.id}`}
            className="reveal grid gap-3 border-t border-rule py-6 md:grid-cols-9 md:gap-x-6 md:py-8"
          >
            <h3 id={`skills-${group.id}`} className="meta pt-1.5 text-ink-muted md:col-span-3">
              {group.label}
            </h3>
            <div className="md:col-span-6">
              <InlineList
                items={group.items}
                separatorClassName="font-normal text-rule"
                className="text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] leading-snug font-medium tracking-tight"
              />
              <p className="mt-3 text-[0.9375rem] text-ink-muted">{group.note}</p>
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
