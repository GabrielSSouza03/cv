import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getContent, sectionIds } from "@/content";
import { locales } from "@/i18n/config";

const pt = getContent("pt");
const en = getContent("en");

/** Replaces every string with a marker so only structure and non-text values are compared. */
function shape(value: unknown): unknown {
  if (typeof value === "string") return "<text>";
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return value;
}

describe("content", () => {
  it("has the same structure in Portuguese and English", () => {
    // Headline line breaks are typographic and may differ per language.
    const comparable = (c: typeof pt) => shape({ ...c, locale: null, hero: { ...c.hero, headline: [] } });
    expect(comparable(pt)).toEqual(comparable(en));
    expect(pt.hero.headline.length).toBeGreaterThan(0);
    expect(en.hero.headline.length).toBeGreaterThan(0);
  });

  it("keeps ids, dates, and technologies identical across locales", () => {
    const pick = (c: typeof pt) =>
      c.experience.organizations.map((org) => ({
        id: org.id,
        roles: org.roles.map(({ id, start, end, stack }) => ({ id, start, end, stack })),
      }));
    expect(pick(pt)).toEqual(pick(en));
    expect(pt.skills.groups.map((g) => [g.id, g.items])).toEqual(en.skills.groups.map((g) => [g.id, g.items]));
    expect(pt.hero.stack).toEqual(en.hero.stack);
  });

  it("labels every section in both locales", () => {
    for (const locale of locales) {
      const content = getContent(locale);
      for (const id of sectionIds) expect(content.nav[id]).toBeTruthy();
    }
  });

  it("points each locale to its own resume file that exists in public/", () => {
    for (const locale of locales) {
      const { resume } = getContent(locale);
      expect(resume.href).toBe(`/documents/cv-${locale}.pdf`);
      expect(existsSync(join(process.cwd(), "public", resume.href))).toBe(true);
    }
  });

  it("lists roles newest first with valid periods", () => {
    for (const org of en.experience.organizations) {
      const months = (d: { year: number; month: number }) => d.year * 12 + d.month;
      const starts = org.roles.map((r) => months(r.start));
      expect([...starts].sort((a, b) => b - a)).toEqual(starts);
      expect(org.roles.filter((r) => r.end === null)).toHaveLength(org.roles[0]?.end === null ? 1 : 0);
      for (const role of org.roles) {
        if (role.end) expect(months(role.end)).toBeGreaterThanOrEqual(months(role.start));
      }
    }
  });
});
