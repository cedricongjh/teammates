package teammates.e2e.cases.playwright.pages;

import static org.junit.Assert.assertEquals;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import teammates.common.datatransfer.attributes.AccountAttributes;

public class AdminAccountsPage extends BasePage {
    private final Locator accountId;
    private final Locator accountName;
    private final Locator accountEmail;

    public AdminAccountsPage(Page page) {
        super(page);
        this.accountId = page.locator("#account-google-id");
        this.accountName = page.locator("#account-name");
        this.accountEmail = page.locator("#account-email");
    }

    public void verifyAccountDetails(AccountAttributes account) {
        assertEquals(account.getGoogleId(), accountId.textContent());
        assertEquals(account.getName(), accountName.textContent());
        assertEquals(account.getEmail(), accountEmail.textContent());
    }
}
