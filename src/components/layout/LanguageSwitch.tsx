"use client";

import { Fragment, type MouseEvent } from "react";
import { sectionIds } from "@/content/shared";
import { htmlLang, locales, type Locale } from "@/i18n/config";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
  languageNames: Record<Locale, string>;
};

/** The last section whose top has scrolled past the upper third of the viewport. */
function currentSectionId(): string | null {
  const threshold = window.innerHeight / 3;
  let current: string | null = null;
  for (const id of sectionIds) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= threshold) current = id;
  }
  return current;
}

function keepSection(event: MouseEvent<HTMLAnchorElement>) {
  const id = currentSectionId();
  const url = new URL(event.currentTarget.href);
  url.hash = id ?? "";
  event.currentTarget.href = url.toString();
}

export function LanguageSwitch({ locale, label, languageNames }: LanguageSwitchProps) {
  return (
    <nav aria-label={label}>
      <ul className="meta flex items-center">
        {locales.map((item, i) => {
          const isCurrent = item === locale;
          return (
            <Fragment key={item}>
              {i > 0 ? (
                <li aria-hidden className="px-1 text-rule">
                  /
                </li>
              ) : null}
              <li>
                <a
                  href={`/${item}`}
                  onClick={keepSection}
                  hrefLang={htmlLang[item]}
                  lang={htmlLang[item]}
                  aria-label={languageNames[item]}
                  aria-current={isCurrent ? "page" : undefined}
                  className="inline-flex min-h-11 min-w-8 items-center justify-center text-ink-muted transition-colors duration-200 hover:text-accent-ink aria-[current]:text-ink"
                >
                  {item.toUpperCase()}
                </a>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
