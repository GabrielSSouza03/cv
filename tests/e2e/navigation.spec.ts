import { expect, test } from "@playwright/test";
import { getContent, sectionIds } from "../../src/content";

const content = getContent("en");

test("desktop nav scrolls to each section", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation only");
  await page.goto("/en");
  const nav = page.getByRole("navigation", { name: content.a11y.primaryNav });

  for (const id of sectionIds) {
    await nav.getByRole("link", { name: content.nav[id], exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}-heading`)).toBeInViewport();
  }
});

test("mobile menu opens, navigates, and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation only");
  await page.goto("/en");

  const openButton = page.getByRole("button", { name: content.a11y.openMenu });
  await openButton.click();
  await expect(openButton).toHaveAttribute("aria-expanded", "true");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: content.nav.experience }).click();

  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator("#experience-heading")).toBeInViewport();
});

test("mobile menu closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile navigation only");
  await page.goto("/en");
  await page.getByRole("button", { name: content.a11y.openMenu }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("skip link moves focus to main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow");
  await page.goto("/en");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: content.a11y.skipToContent });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
