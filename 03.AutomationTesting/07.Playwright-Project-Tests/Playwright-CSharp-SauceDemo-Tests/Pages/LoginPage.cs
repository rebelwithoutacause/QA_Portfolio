using Microsoft.Playwright;

namespace PlaywrightCSharpTests.Pages;

public class LoginPage
{
    private readonly IPage _page;

    public ILocator UsernameInput { get; }
    public ILocator PasswordInput { get; }
    public ILocator LoginButton { get; }
    public ILocator ErrorMessage { get; }

    public LoginPage(IPage page)
    {
        _page = page;
        UsernameInput = page.GetByPlaceholder("Username");
        PasswordInput = page.GetByPlaceholder("Password");
        LoginButton = page.GetByRole(AriaRole.Button, new() { Name = "Login" });
        ErrorMessage = page.Locator("[data-test='error']");
    }

    public async Task GotoAsync()
    {
        await _page.GotoAsync("https://www.saucedemo.com/");
    }

    public async Task LoginAsync(string username, string password)
    {
        await UsernameInput.FillAsync(username);
        await PasswordInput.FillAsync(password);
        await LoginButton.ClickAsync();
    }
}
