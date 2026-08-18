import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // loggedInPage вече зависи от loginPage вместо да дублира locators
  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await use(page);
  },
});

export { expect };
