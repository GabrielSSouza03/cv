import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { locales } from "../../src/i18n/config";

for (const locale of locales) {
  test(`/${locale} has no serious accessibility violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");

    expect(
      serious.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target.join(" ")) })),
    ).toEqual([]);
  });
}
