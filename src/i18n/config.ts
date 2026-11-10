export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}

/** Picks a locale from the first (highest-priority) tag of an Accept-Language header. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  const firstTag = header?.split(",")[0]?.split(";")[0]?.trim().toLowerCase() ?? "";
  return firstTag === "pt" || firstTag.startsWith("pt-") ? "pt" : defaultLocale;
}
