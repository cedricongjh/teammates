package teammates.e2e.cases.playwright.pages;

import static org.junit.Assert.assertEquals;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import teammates.common.datatransfer.attributes.AccountAttributes;
import teammates.common.util.AppUrl;
import teammates.common.util.Const;
import teammates.e2e.util.TestProperties;

public class AdminAccountsPage {
    private final Page page;
    private final Locator accountId;
    private final Locator accountName;
    private final Locator accountEmail;

    public AdminAccountsPage(Page page) {
        this.page = page;
        this.accountId = page.locator("#account-google-id");
        this.accountName = page.locator("#account-name");
        this.accountEmail = page.locator("#account-email");
    }

    /**
     * Creates an {@link AppUrl} for the supplied {@code relativeUrl} parameter.
     * The base URL will be the value of test.app.frontend.url in test.properties.
     * {@code relativeUrl} must start with a "/".
     */
    protected static AppUrl createFrontendUrl(String relativeUrl) {
        return new AppUrl(TestProperties.TEAMMATES_FRONTEND_URL + relativeUrl);
    }

    public void navigate() {
        String googleId = "tm.e2e.AAccounts.instr2";
        AppUrl accountsPageUrl = createFrontendUrl(Const.WebPageURIs.ADMIN_ACCOUNTS_PAGE)
                .withParam(Const.ParamsNames.INSTRUCTOR_ID, googleId);
        this.page.navigate(accountsPageUrl.toAbsoluteString());
    }

    public void verifyAccountDetails(AccountAttributes account) {
        assertEquals(account.getGoogleId(), accountId.textContent());
        assertEquals(account.getName(), accountName.textContent());
        assertEquals(account.getEmail(), accountEmail.textContent());
    }
}
