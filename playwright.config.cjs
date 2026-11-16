const { defineConfig } = require('playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  timeout: 45_000,
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev/todomvc/',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
