# Playwright SauceDemo Tests

UI test suite against [saucedemo.com](https://www.saucedemo.com), demonstrating:

- **Locators** — `getByRole`, `getByPlaceholder`, `getByTestId`/attribute selectors, priority order
- **Auto-retrying assertions** — `expect(locator).toBeVisible()`, `toHaveText()`, no manual waits
- **Fixtures** (`tests/fixtures.js`) — custom `loggedInPage` fixture built with `test.extend()`, composed from Page Object fixtures
- **Page Object Model** (`tests/pages/`) — `LoginPage`, `InventoryPage` encapsulate locators and actions; assertions stay in the tests

## Structure

```
tests/
  pages/
    LoginPage.js
    InventoryPage.js
  fixtures.js          # test.extend() wiring for POM + logged-in state
  locators.spec.js      # locator strategy recap
  saucedemo.spec.js     # login, cart, sorting scenarios
```

## Run

```bash
npm install
npx playwright install
npm test              # headless, all browsers
npm run test:ui       # interactive UI mode
npm run report        # open last HTML report
```
