package teammates.e2e.cases.playwright;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import teammates.common.datatransfer.DataBundle;
import teammates.common.datatransfer.attributes.AccountAttributes;
import teammates.common.util.AppUrl;
import teammates.common.util.Const;
import teammates.e2e.cases.playwright.pages.AdminAccountsPage;
import teammates.e2e.cases.playwright.pages.LoginPage;

public class AdminAccountsPageE2ETest extends BaseE2ETest {
    LoginPage loginPage;
    AdminAccountsPage adminAccountsPage;
    protected DataBundle testData;

    @BeforeMethod
    void setUpPage() {
        testData = loadDataBundle("/AdminAccountsPageE2ETest.json");
        removeAndRestoreDataBundle(testData);
        loginPage = new LoginPage(page);
        adminAccountsPage = new AdminAccountsPage(page);
        AppUrl loginPageUrl = createBackendUrl("/devServerLogin");
        loginPage.navigateWithAppUrl(loginPageUrl);
        loginPage.loginToDevServer("app_admin");
    }

    @Test
    void verifyLoadedData() {
        String googleId = "tm.e2e.AAccounts.instr2";
        AppUrl accountsPageUrl = createFrontendUrl(Const.WebPageURIs.ADMIN_ACCOUNTS_PAGE)
                .withParam(Const.ParamsNames.INSTRUCTOR_ID, googleId);
        adminAccountsPage.navigateWithAppUrl(accountsPageUrl);
        AccountAttributes account = getAccount(googleId);
        adminAccountsPage.verifyAccountDetails(account);
    }
}
