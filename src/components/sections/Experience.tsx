import { Section } from "@/components/ui/Section";
import { TechList } from "@/components/ui/TechList";
import type { Content, Role, YearMonth } from "@/content";
import type { Locale } from "@/i18n/config";
import { formatDuration, formatYearMonth, monthsBetween, toYearMonth } from "@/lib/date";

type ExperienceProps = { content: Content; index: number };

export function Experience({ content, index }: ExperienceProps) {
  const { experience, nav, locale } = content;
  const today = toYearMonth(new Date());

  return (
    <Section id="experience" index={index} label={nav.experience} heading={experience.heading}>
      {experience.organizations.map((org) => {
        const first = org.roles[org.roles.length - 1];
        const latest = org.roles[0];
        return (
          <article key={org.id} aria-labelledby={`org-${org.id}`} className="mb-16 last:mb-0">
            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-4">
              <h3 id={`org-${org.id}`} className="font-serif text-[clamp(1.75rem,1.5rem+1vw,2.5rem)] leading-tight">
                {org.name}
              </h3>
              <p className="meta text-ink-muted">
                {org.location}
                {first && latest ? (
                  <>
                    <span aria-hidden> · </span>
                    {formatPeriod(first.start, latest.end, locale, experience.present)}
                  </>
                ) : null}
              </p>
            </header>

            <ol className="relative mt-10 before:absolute before:top-2 before:bottom-0 before:left-[3px] before:w-px before:bg-rule">
              {org.roles.map((role) => (
                <RoleItem key={role.id} role={role} content={content} today={today} />
              ))}
            </ol>
          </article>
        );
      })}
    </Section>
  );
}

function RoleItem({ role, content, today }: { role: Role; content: Content; today: YearMonth }) {
  const { locale, experience } = content;
  const isCurrent = role.end === null;
  const duration = formatDuration(monthsBetween(role.start, role.end ?? today), experience.durationUnits);

  return (
    <li className="reveal relative pb-14 pl-8 last:pb-0 md:grid md:grid-cols-9 md:gap-x-6">
      <span
        aria-hidden
        className={`absolute top-1.5 left-0 size-[7px] ${isCurrent ? "bg-accent" : "bg-ink"}`}
      />
      <p className="meta text-ink-muted md:col-span-3">
        <span className="text-ink">{formatPeriod(role.start, role.end, locale, experience.present)}</span>
        <span className="mt-1 block">{duration}</span>
      </p>

      <div className="mt-3 md:col-span-6 md:mt-0">
        <h4 className="text-h3 font-medium tracking-tight">{role.title}</h4>
        <ul className="mt-5 border-t border-rule">
          {role.highlights.map((item) => (
            <li key={item} className="border-b border-rule py-3 leading-relaxed text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <dt className="meta text-ink-muted">{experience.stackLabel}</dt>
          <dd>
            <TechList items={role.stack} />
          </dd>
        </dl>
      </div>
    </li>
  );
}

function formatPeriod(start: YearMonth, end: YearMonth | null, locale: Locale, present: string) {
  return `${formatYearMonth(start, locale)} – ${end ? formatYearMonth(end, locale) : present}`;
}
