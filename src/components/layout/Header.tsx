import { Monogram } from "@/components/brand/Monogram";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { sectionIds, type Content } from "@/content";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { Nav } from "./Nav";

export function Header({ content }: { content: Content }) {
  const { locale, a11y, nav, resume, languageNames } = content;
  const items = sectionIds.map((id) => ({ id, label: nav[id] }));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 supports-[backdrop-filter]:bg-paper/85 supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href={`/${locale}`} aria-label={a11y.home} className="-m-2 inline-flex p-2 text-ink">
          <Monogram className="h-6 w-auto" />
        </a>

        <Nav label={a11y.primaryNav} items={items} className="hidden lg:block" />

        <div className="flex items-center gap-3 sm:gap-5">
          <LanguageSwitch locale={locale} label={a11y.languageSwitch} languageNames={languageNames} />
          <ResumeLink resume={resume} variant="secondary" compact />
          <MobileMenu
            className="lg:hidden"
            navLabel={a11y.primaryNav}
            openLabel={a11y.openMenu}
            closeLabel={a11y.closeMenu}
            items={items}
            footer={<ResumeLink resume={resume} variant="secondary" />}
          />
        </div>
      </div>
    </header>
  );
}
