package teammates.e2e.cases.playwright;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import teammates.e2e.cases.playwright.pages.LoginPage;

public class LoginTest extends BaseE2ETest {
    LoginPage loginPage;

    @BeforeMethod
    void setUpPage() {
        loginPage = new LoginPage(page);
    }

    @Test
    void canLogin() {
        loginPage.navigate();
        loginPage.loginToDevServer();
    }

}
