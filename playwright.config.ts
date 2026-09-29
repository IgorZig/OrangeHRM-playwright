import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

if (existsSync(resolve('.env'))) process.loadEnvFile(resolve('.env'));
const runDir =
  process.env.PW_RUN_DIR ||
  join('artifacts', `run-${new Date().toISOString().replace(/[:.]/g, '-')}-${process.pid}`);
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  outputDir: join(runDir, 'test-results'),
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: join(runDir, 'playwright-report') }],
    ['json', { outputFile: join(runDir, 'results.json') }],
    ['junit', { outputFile: join(runDir, 'junit.xml') }],
    [
      'allure-playwright',
      {
        resultsDir: join(runDir, 'allure-results'),
        environmentInfo: {
          browser: 'chromium',
          node: process.version,
          commit: process.env.RUN_COMMIT || 'working-tree',
          target: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
        },
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
