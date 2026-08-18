using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace PlaywrightCSharpTests;

// NUnit.Framework идва като global using от .csproj, не е нужен тук
// PageTest дава готов Page (аналог на { page } fixture-a от JS), плюс Expect()
[TestFixture]
public partial class ExampleTests : PageTest
{
    // [GeneratedRegex] - source generator компилира regex-a at compile-time, вместо runtime parsing
    [GeneratedRegex("Playwright")]
    private static partial Regex PlaywrightTitleRegex();

    [GeneratedRegex("/inventory.html")]
    private static partial Regex InventoryUrlRegex();

    [Test]
    public async Task HasTitle()
    {
        await Page.GotoAsync("https://playwright.dev/");

        // Expect() е static import от Microsoft.Playwright.Assertions - идва безплатно от PageTest
        await Expect(Page).ToHaveTitleAsync(PlaywrightTitleRegex());
    }

    [Test]
    public async Task GetStartedLink()
    {
        await Page.GotoAsync("https://playwright.dev/");

        // GetByRole изисква AriaRole enum, не string, за разлика от JS
        await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();

        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" }))
            .ToBeVisibleAsync();
    }

    [Test]
    public async Task LoginWithValidCredentials()
    {
        await Page.GotoAsync("https://www.saucedemo.com/");

        await Page.GetByPlaceholder("Username").FillAsync("standard_user");
        await Page.GetByPlaceholder("Password").FillAsync("secret_sauce");
        await Page.GetByRole(AriaRole.Button, new() { Name = "Login" }).ClickAsync();

        await Expect(Page).ToHaveURLAsync(InventoryUrlRegex());
    }

    [Test]
    public async Task LoginWithInvalidCredentials()
    {
        await Page.GotoAsync("https://www.saucedemo.com/");

        await Page.GetByPlaceholder("Username").FillAsync("error_user");
        await Page.GetByPlaceholder("Password").FillAsync("invalid_password");
        await Page.GetByRole(AriaRole.Button, new() { Name = "Login" }).ClickAsync();

        await Expect(Page.Locator("[data-test='error']"))
            .ToHaveTextAsync("Epic sadface: Username and password do not match any user in this service");
    }
}  
