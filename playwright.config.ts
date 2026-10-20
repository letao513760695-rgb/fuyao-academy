import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    headless: true,
    viewport: { width: 1440, height: 1000 },
    launchOptions: existsSync('/usr/bin/chromium') ? { executablePath: '/usr/bin/chromium' } : {},
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
});
