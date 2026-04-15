import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'fs';

const CUSTOM_CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const launchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  ...(existsSync(CUSTOM_CHROME) ? { executablePath: CUSTOM_CHROME } : {}),
};

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions,
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        launchOptions,
      },
    },
  ],
  webServer: {
    command: 'npx serve . --listen 8080 --no-clipboard',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
