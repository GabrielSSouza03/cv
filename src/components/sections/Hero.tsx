import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { TechList } from "@/components/ui/TechList";
import { person, type Content } from "@/content";

export function Hero({ content }: { content: Content }) {
  const { hero, resume } = content;
  const lastLine = hero.headline.length - 1;

  return (
    <section id="top" aria-labelledby="hero-heading" className="container-page">
      <div className="pt-[clamp(3rem,8vw,7rem)] pb-[clamp(4rem,9vw,8rem)]">
        <p className="meta flex flex-wrap gap-x-3 gap-y-1 text-ink-muted">
          <span className="w-full text-ink sm:w-auto">{hero.role}</span>
          <span aria-hidden className="hidden sm:inline">
            —
          </span>
          <span>{hero.location}</span>
        </p>

        <h1 id="hero-heading" className="mt-10 lg:mt-16">
          <span className="block text-h3 font-medium tracking-tight">{person.name}</span>
          <span className="mt-5 block font-serif text-display text-balance lg:mt-8">
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className="animate-rise lg:block"
                style={{ animationDelay: `${100 + i * 110}ms` }}
              >
                {line}
                {i === lastLine ? <span className="text-accent">.</span> : " "}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <p className="max-w-[52ch] text-body-lg text-ink-muted lg:col-span-6 lg:col-start-4">{hero.intro}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 lg:col-span-3 lg:flex-col lg:items-end lg:justify-end">
            <ButtonLink href="#contact">
              {hero.ctaContact}
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
            </ButtonLink>
            <ResumeLink resume={resume} />
          </div>
        </div>

        <dl className="meta mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-4 lg:mt-24">
          <dt className="text-ink-muted">{hero.stackLabel}</dt>
          <dd>
            <TechList items={hero.stack} />
          </dd>
        </dl>
      </div>
    </section>
  );
}
