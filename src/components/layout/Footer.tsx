import { Monogram } from "@/components/brand/Monogram";
import { person, type Content } from "@/content";

export function Footer({ content }: { content: Content }) {
  const { hero, footer, a11y } = content;
  const year = new Date().getFullYear();

  const links = [
    { label: person.email, href: `mailto:${person.email}`, external: false },
    { label: "LinkedIn", href: person.links.linkedin, external: true },
    { label: "GitHub", href: person.links.github, external: true },
  ];

  return (
    <footer className="container-page">
      <div className="grid gap-10 border-t border-ink py-12 md:grid-cols-12 md:gap-6">
        <div className="flex items-start gap-4 md:col-span-5">
          <Monogram className="mt-1 h-6 w-auto shrink-0" />
          <p className="leading-snug">
            <span className="block font-medium">{person.name}</span>
            <span className="block text-ink-muted">{hero.role}</span>
          </p>
        </div>

        <ul className="meta flex flex-col gap-1 normal-case md:col-span-4">
          {links.map(({ label, href, external }) => (
            <li key={href}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex min-h-11 items-center tracking-normal text-ink transition-colors hover:text-accent-ink md:min-h-8"
              >
                {label}
                {external ? <span className="sr-only"> {a11y.opensInNewTab}</span> : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="meta flex flex-col justify-between gap-6 text-ink-muted md:col-span-3 md:items-end md:text-right">
          <a href="#top" className="inline-flex min-h-11 items-center text-ink hover:text-accent-ink md:min-h-8">
            {footer.backToTop} ↑
          </a>
          <p>
            © {year} {person.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
