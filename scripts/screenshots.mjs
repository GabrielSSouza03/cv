// Captures responsive screenshots for visual review.
// Usage: BASE_URL=http://localhost:3000 node scripts/screenshots.mjs
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = ".screenshots";

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const locale of ["en", "pt"]) {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${baseUrl}/${locale}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-fold.png` });
    await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-full.png`, fullPage: true });

    for (const id of ["about", "experience", "skills", "education", "contact"]) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await section.screenshot({ path: `${outDir}/${locale}-${vp.name}-${id}.png` });
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.warn(`horizontal overflow ${overflow}px on /${locale} @ ${vp.width}`);

    if (vp.width < 1024) {
      await page.getByRole("button", { name: /menu/i }).click();
      await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-menu.png` });
    }
    await page.close();
  }
}

await browser.close();
console.log(`saved to ${outDir}/`);
