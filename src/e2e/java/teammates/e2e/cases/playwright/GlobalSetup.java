package teammates.e2e.cases.playwright;

import java.nio.file.Paths;

import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.AriaRole;

public class GlobalSetup {
    @BeforeSuite
    public void globalSetup() {
        // Perform global setup operations here.
        // For example, initialize shared resources, configure settings, etc.
        Playwright playwright = Playwright.create();
        Browser browser = playwright.chromium().launch();
        System.out.println("Global setup - This method runs once before the suite.");
        BrowserContext context = browser.newContext();
        Page page = context.newPage();
        page.navigate("https://github.com/login");
        // Interact with login form
        page.getByLabel("Username or email address").fill("cedricongjh");
        page.getByLabel("Password").fill("S99915041g!");
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in")).click();
        // Continue with the test
        context.storageState(new BrowserContext.StorageStateOptions().setPath(Paths.get("state.json")));
        context.close();
        playwright.close();
    }

    // This method runs once after the entire test suite.
    @AfterSuite
    public void globalTeardown() {
        // Perform global teardown operations here.
        // For example, clean up shared resources, finalize configurations, etc.
        System.out.println("Global teardown - This method runs once after the suite.");
    }
}
