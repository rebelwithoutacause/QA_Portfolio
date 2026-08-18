# Playwright C# SauceDemo Tests

UI test suite against [saucedemo.com](https://www.saucedemo.com) using Playwright for .NET
(NUnit), demonstrating the C# equivalent of the JS SauceDemo suite:

- **Locators** — `GetByRole`, `GetByPlaceholder`, attribute selectors (`Page.Locator("[data-test=...]")`)
- **Auto-retrying assertions** — `Expect(locator).ToBeVisibleAsync()`, `ToHaveTextAsync()`
- **`[SetUp]`** — NUnit's per-test hook (equivalent to JS `beforeEach`), wires up Page Object instances before every test
- **Page Object Model** (`Pages/`) — `LoginPage`, `InventoryPage` encapsulate locators and actions; assertions stay in the tests
- **`[GeneratedRegex]`** — compile-time regex source generator instead of runtime `new Regex(...)`
- Culture-invariant numeric parsing (`decimal.Parse(text, CultureInfo.InvariantCulture)`) — avoids locale-dependent parsing bugs (e.g. `bg-BG` uses `,` as the decimal separator)

## Structure

```
Pages/
  LoginPage.cs
  InventoryPage.cs
ExampleTests.cs      # anatomy recap: title, navigation, login
SaucedemoTests.cs     # POM-based: login, cart, price sorting
```

## Run

```bash
dotnet restore
dotnet build
pwsh bin/Debug/net9.0/playwright.ps1 install   # or: ./bin/Debug/net9.0/playwright.ps1 install on Windows PowerShell
dotnet test
```
