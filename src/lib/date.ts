import type { YearMonth } from "@/content/types";
import { htmlLang, type Locale } from "@/i18n/config";

type Plural = { one: string; other: string };
export type DurationUnits = { year: Plural; month: Plural };

export function formatYearMonth({ year, month }: YearMonth, locale: Locale): string {
  const name = new Intl.DateTimeFormat(htmlLang[locale], { month: "short", timeZone: "UTC" })
    .format(Date.UTC(year, month - 1, 1))
    .replace(".", "");
  return `${name} ${year}`;
}

export function toYearMonth(date: Date): YearMonth {
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

/** Whole months from start to end, counting both ends (Sep–Dec = 4), as LinkedIn does. */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

export function formatDuration(totalMonths: number, units: DurationUnits): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const part = (n: number, unit: Plural) => `${n} ${n === 1 ? unit.one : unit.other}`;
  return [years > 0 ? part(years, units.year) : null, months > 0 ? part(months, units.month) : null]
    .filter(Boolean)
    .join(" ");
}
