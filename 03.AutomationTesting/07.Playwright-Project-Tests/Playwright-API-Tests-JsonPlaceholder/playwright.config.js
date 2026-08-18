// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // API-only project: no browser needed, request fixture works without projects/devices.
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
});
