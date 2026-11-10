import type { Locale } from "@/i18n/config";
import type { DurationUnits } from "@/lib/date";
import type { SectionId, Tech } from "./shared";

export type YearMonth = { year: number; month: number };

export interface Role {
  id: string;
  title: string;
  start: YearMonth;
  /** `null` marks the current role. */
  end: YearMonth | null;
  highlights: string[];
  stack: Tech[];
}

export interface Organization {
  id: string;
  name: string;
  location: string;
  /** Newest first. */
  roles: Role[];
}

export interface SkillGroup {
  id: string;
  label: string;
  note: string;
  items: Tech[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  completedLabel: string;
  completed: YearMonth;
}

export interface Content {
  locale: Locale;
  meta: { title: string; description: string };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    languageSwitch: string;
    opensInNewTab: string;
    home: string;
  };
  languageNames: Record<Locale, string>;
  nav: Record<SectionId, string>;
  resume: { label: string; shortLabel: string; fileName: string; href: string };
  hero: {
    role: string;
    location: string;
    /** Rendered one line per item; the final period is added by the component. */
    headline: string[];
    intro: string;
    ctaContact: string;
    stackLabel: string;
    stack: Tech[];
  };
  about: {
    heading: string;
    paragraphs: string[];
    focusLabel: string;
    focus: string[];
    portrait: { alt: string; caption: string };
  };
  experience: {
    heading: string;
    present: string;
    stackLabel: string;
    durationUnits: DurationUnits;
    organizations: Organization[];
  };
  skills: { heading: string; intro: string; groups: SkillGroup[] };
  education: { heading: string; items: EducationItem[] };
  contact: { heading: string; lead: string; emailLabel: string; elsewhereLabel: string };
  footer: { rights: string; backToTop: string };
}
