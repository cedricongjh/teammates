package teammates.e2e.cases.playwright.pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class LoginPage {
    private final Page page;

    public LoginPage(Page page) {
        this.page = page;
    }

    public void navigate() {
        page.navigate("http://localhost:8080/devServerLogin");
    }

    public void loginToDevServer() {
        Locator emailInput = page.locator("#email");
        emailInput.fill("app_admin");
        page.click("#btn-login");
    }
}
