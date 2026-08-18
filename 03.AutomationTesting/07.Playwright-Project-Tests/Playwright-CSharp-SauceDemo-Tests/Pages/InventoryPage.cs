using System.Globalization;
using Microsoft.Playwright;

namespace PlaywrightCSharpTests.Pages;

public class InventoryPage
{
    private readonly IPage _page;

    public ILocator Title { get; }
    public ILocator CartBadge { get; }
    public ILocator SortDropdown { get; }
    public ILocator ProductNames { get; }
    public ILocator ProductPrices { get; }

    public InventoryPage(IPage page)
    {
        _page = page;
        Title = page.Locator("[data-test='title']");
        CartBadge = page.Locator("[data-test='shopping-cart-badge']");
        SortDropdown = page.Locator("[data-test='product-sort-container']");
        ProductNames = page.Locator("[data-test='inventory-item-name']");
        ProductPrices = page.Locator("[data-test='inventory-item-price']");
    }

    public Task AddToCartAsync(string productTestId)
    {
        return _page.Locator($"[data-test='add-to-cart-{productTestId}']").ClickAsync();
    }

    // приема видимия label от dropdown-a, напр. "Price (low to high)"
    public Task SortByAsync(string label)
    {
        return SortDropdown.SelectOptionAsync(new SelectOptionValue { Label = label });
    }

    public async Task<string> GetFirstProductNameAsync()
    {
        return await ProductNames.First.TextContentAsync() ?? string.Empty;
    }

    public async Task<List<decimal>> GetAllPricesAsync()
    {
        var prices = await ProductPrices.AllTextContentsAsync();
        return prices
            .Select(p => decimal.Parse(p.Replace("$", ""), CultureInfo.InvariantCulture))
            .ToList();
    }
}
