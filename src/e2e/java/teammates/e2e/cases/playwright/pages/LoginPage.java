package teammates.e2e.cases.playwright.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class LoginPage extends BasePage {
    public LoginPage(Page page) {
        super(page);
    }

    public void loginToDevServer(String email) {
        Locator emailInput = page.locator("#email");
        emailInput.fill(email);
        page.click("#btn-login");
    }
}
