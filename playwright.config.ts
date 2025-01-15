import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    browserName: 'chromium',
    headless: false,  // Open the browser window for interactive tests
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
