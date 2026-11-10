import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { pt } from "./pt";
import type { Content } from "./types";

const contentByLocale: Record<Locale, Content> = { pt, en };

export function getContent(locale: Locale): Content {
  return contentByLocale[locale];
}

export { person, sectionIds, technologies } from "./shared";
export type { SectionId, Tech } from "./shared";
export type * from "./types";
