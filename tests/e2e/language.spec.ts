import { expect, test } from "@playwright/test";
import { getContent } from "../../src/content";

const en = getContent("en");
const pt = getContent("pt");

test("switches language and keeps the current section", async ({ page }) => {
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#skills").evaluate((el) => el.scrollIntoView({ behavior: "instant" }));
  await expect(page.locator("#skills-heading")).toBeInViewport();

  const switcher = page.getByRole("navigation", { name: en.a11y.languageSwitch });
  const toPt = switcher.getByRole("link", { name: en.languageNames.pt });
  await expect(toPt).toHaveAttribute("href", "/pt");
  // Playwright's click() scrolls the page even for sticky elements; a native click does not.
  await toPt.evaluate((link: HTMLAnchorElement) => link.click());

  await expect(page).toHaveURL(/\/pt#skills$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 2, name: pt.skills.heading })).toBeInViewport();
});

test("switches from the top of the page without a section", async ({ page }) => {
  await page.goto("/pt");
  const switcher = page.getByRole("navigation", { name: pt.a11y.languageSwitch });
  await switcher.getByRole("link", { name: pt.languageNames.en }).click();
  await expect(page).toHaveURL(/\/en$/);
});

test("marks the current language", async ({ page }) => {
  await page.goto("/pt");
  const switcher = page.getByRole("navigation", { name: pt.a11y.languageSwitch });
  await expect(switcher.getByRole("link", { name: pt.languageNames.pt })).toHaveAttribute("aria-current", "page");
  await expect(switcher.getByRole("link", { name: pt.languageNames.en })).not.toHaveAttribute("aria-current");
});

test.describe("root redirect", () => {
  for (const [header, target] of [
    ["pt-BR,pt;q=0.9,en;q=0.8", "/pt"],
    ["en-US,en;q=0.9", "/en"],
    ["de-DE", "/en"],
  ] as const) {
    test(`${header} → ${target}`, async ({ request }) => {
      const response = await request.get("/", { headers: { "accept-language": header }, maxRedirects: 0 });
      expect(response.status()).toBe(307);
      expect(new URL(response.headers()["location"]!, "http://x").pathname).toBe(target);
    });
  }
});
