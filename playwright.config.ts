import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: "http://127.0.0.1:4173" },
  projects: [
    { name: "mobile", use: { ...devices["iPhone 13"], viewport: { width: 375, height: 812 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: { command: "python3 -m http.server 4173 --bind 127.0.0.1 --directory out", url: "http://127.0.0.1:4173", reuseExistingServer: !process.env.CI },
});
