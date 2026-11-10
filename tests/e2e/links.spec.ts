import { expect, test } from "@playwright/test";
import { getContent, person } from "../../src/content";
import { locales } from "../../src/i18n/config";

for (const locale of locales) {
  const content = getContent(locale);

  test(`/${locale} resume links download the ${locale} PDF`, async ({ page, request }) => {
    await page.goto(`/${locale}`);
    const links = page.locator(`a[href="${content.resume.href}"]`);
    expect(await links.count()).toBeGreaterThanOrEqual(2);
    await expect(links.first()).toHaveAttribute("download", content.resume.fileName);

    const response = await request.get(content.resume.href);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test(`/${locale} contact links point to the right places`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const contact = page.locator("#contact");

    await expect(contact.getByRole("link", { name: person.email })).toHaveAttribute("href", `mailto:${person.email}`);

    for (const [name, href] of [
      ["LinkedIn", person.links.linkedin],
      ["GitHub", person.links.github],
    ] as const) {
      const link = contact.getByRole("link", { name: new RegExp(name) });
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });
}
