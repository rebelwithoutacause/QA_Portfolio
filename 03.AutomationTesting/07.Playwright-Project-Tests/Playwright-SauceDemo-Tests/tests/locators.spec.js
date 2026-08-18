// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Locators recap', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('getByRole - най-препоръчан, базиран на accessibility tree', async ({ page }) => {
    const getStarted = page.getByRole('link', { name: 'Get started' });
    await expect(getStarted).toBeVisible();
  });

  test('filter + chaining - стесняваш selector без crazy CSS/XPath', async ({ page }) => {
    // Всички линкове в навигацията, после филтрираме по текст
    const nav = page.locator('nav');
    const docsLink = nav.getByRole('link', { name: 'Docs' });
    await expect(docsLink).toBeVisible();
  });

  test('auto-waiting demo - expect чака, не спираме ръчно', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    // Playwright автоматично чака навигацията + елементът да се появи
    // Няма нужда от waitForNavigation() или sleep()
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    await expect(page).toHaveURL(/.*intro/);
  });

  test('текстови assertions с auto-retry', async ({ page }) => {
    const heading = page.locator('h1').first();
    // toHaveText чака елементът да съществува И текстът да съвпадне
    await expect(heading).toContainText(/Playwright/i);
  });
});
