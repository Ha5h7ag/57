import { defineConfig } from "@playwright/test";
const base = (process.env.VITE_BASE_PATH || "/").replace(/\/?$/, "/");
const remoteURL = process.env.E2E_BASE_URL;
const baseURL = remoteURL || `http://127.0.0.1:4173${base}`;
export default defineConfig({
  testDir: "tests/e2e",
  timeout: remoteURL ? 120000 : 30000,
  workers: remoteURL ? 1 : process.env.CI ? 2 : 3,
  use: {
    baseURL,
    reducedMotion: "reduce",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    trace: "retain-on-failure",
  },
  webServer: remoteURL
    ? undefined
    : {
        command: "npm run preview",
        url: `http://127.0.0.1:4173${base}`,
        reuseExistingServer: !process.env.CI,
      },
  reporter: [["list"]],
});
