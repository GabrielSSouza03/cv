import { expect, test } from "@playwright/test";
import { getContent, sectionIds } from "../../src/content";
import { htmlLang, locales } from "../../src/i18n/config";

for (const locale of locales) {
  const content = getContent(locale);

  test.describe(`/${locale}`, () => {
    test("renders the hero and every section", async ({ page }) => {
      await page.goto(`/${locale}`);

      await expect(page.locator("html")).toHaveAttribute("lang", htmlLang[locale]);
      await expect(page).toHaveTitle(content.meta.title);

      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toContainText("Gabriel Simões");
      await expect(h1).toContainText(content.hero.headline[0]!);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

      for (const id of sectionIds) {
        await expect(page.locator(`section#${id}`)).toBeAttached();
        await expect(page.getByRole("heading", { level: 2, name: content[id].heading })).toBeAttached();
      }
    });

    test("shows every role from the content", async ({ page }) => {
      await page.goto(`/${locale}`);
      for (const org of content.experience.organizations) {
        for (const role of org.roles) {
          await expect(page.getByRole("heading", { level: 4, name: role.title })).toBeAttached();
        }
      }
    });

    test("has no horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 720 });
      await page.goto(`/${locale}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test("unknown locale returns 404", async ({ request }) => {
  const response = await request.get("/fr");
  expect(response.status()).toBe(404);
});
