import { test, expect } from './fixtures';

test.describe('Saucedemo login', () => {
  test('Login with valid credentials redirects to inventory', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/inventory\.html/);
    await expect(loggedInPage.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Login with invalid credentials shows error message', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('The badge in cart equals the number of added products', async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.addToCartByTestId('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
//test for sorting products by price from low to high
test ('Price sort by low to high', async ({ loggedInPage, inventoryPage }) => {
  await inventoryPage.sortBy('Price (low to high)');
  const prices = await inventoryPage.getAllPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});
//test that first product sorting by price from low to high is "Sauce Labs Onesie"
test ('First product after sorting by price from low to high is Sauce Labs Onesie', 
  async ({ loggedInPage, inventoryPage }) => {
  await inventoryPage.sortBy('Price (low to high)');
  const firstProductName = await inventoryPage.getFirstProductName();
  const firstProductPrice = await inventoryPage.getFirstProductPrice();
  expect(firstProductName).toBe('Sauce Labs Onesie');
  expect(firstProductPrice).toBe('$7.99');
});
