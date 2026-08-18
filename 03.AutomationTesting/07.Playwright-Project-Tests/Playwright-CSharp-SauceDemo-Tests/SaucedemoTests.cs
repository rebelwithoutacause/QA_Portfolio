using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using PlaywrightCSharpTests.Pages;

namespace PlaywrightCSharpTests;

[TestFixture]
public class SaucedemoTests : PageTest
{
    private LoginPage _loginPage = null!;
    private InventoryPage _inventoryPage = null!;

    // [SetUp] тук е аналог на beforeEach от JS - изпълнява се преди всеки [Test]
    // Page вече е готов от PageTest базовия клас в този момент
    [SetUp]
    public void SetUpPages()
    {
        _loginPage = new LoginPage(Page);
        _inventoryPage = new InventoryPage(Page);
    }

    [Test]
    public async Task LoginWithValidCredentialsRedirectsToInventory()
    {
        await _loginPage.GotoAsync();
        await _loginPage.LoginAsync("standard_user", "secret_sauce");

        await Expect(_inventoryPage.Title).ToHaveTextAsync("Products");
    }

    [Test]
    public async Task LoginWithInvalidCredentialsShowsErrorMessage()
    {
        await _loginPage.GotoAsync();
        await _loginPage.LoginAsync("invalid_user", "invalid_password");

        await Expect(_loginPage.ErrorMessage).ToHaveTextAsync(
            "Epic sadface: Username and password do not match any user in this service");
    }

    [Test]
    public async Task AddingProductUpdatesCartBadge()
    {
        await _loginPage.GotoAsync();
        await _loginPage.LoginAsync("standard_user", "secret_sauce");

        await _inventoryPage.AddToCartAsync("sauce-labs-backpack");

        await Expect(_inventoryPage.CartBadge).ToHaveTextAsync("1");
    }

    [Test]
    public async Task SortingByPriceLowToHighOrdersCorrectly()
    {
        await _loginPage.GotoAsync();
        await _loginPage.LoginAsync("standard_user", "secret_sauce");

        await _inventoryPage.SortByAsync("Price (low to high)");

        var prices = await _inventoryPage.GetAllPricesAsync();
        var sortedPrices = prices.OrderBy(p => p).ToList();

        Assert.That(prices, Is.EqualTo(sortedPrices), "Prices are not sorted from low to high.");
    }
}
