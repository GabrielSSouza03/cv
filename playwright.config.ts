import { defineConfig, devices } from "@playwright/test";

const port = 3200;
const externalBaseUrl = process.env.BASE_URL;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: externalBaseUrl ?? `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        // `exec` lets Playwright stop the Next.js server itself instead of leaving it orphaned.
        command: `npm run build && exec ./node_modules/.bin/next start -p ${port}`,
        url: `http://localhost:${port}/en`,
        reuseExistingServer: false,
        timeout: 180_000,
      },
});
