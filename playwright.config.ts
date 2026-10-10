import { defineConfig } from "@playwright/test";
const base = (process.env.VITE_BASE_PATH || "/").replace(/\/?$/, "/");
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30000,
  workers: process.env.CI ? 2 : 3,
  use: {
    baseURL: `http://127.0.0.1:4173${base}`,
    reducedMotion: "reduce",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview",
    url: `http://127.0.0.1:4173${base}`,
    reuseExistingServer: !process.env.CI,
  },
  reporter: [["list"]],
});
