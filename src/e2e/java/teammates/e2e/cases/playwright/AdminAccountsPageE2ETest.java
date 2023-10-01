package teammates.e2e.cases.playwright;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import teammates.common.datatransfer.DataBundle;
import teammates.common.datatransfer.attributes.AccountAttributes;
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
        loginPage.navigate();
        loginPage.loginToDevServer();
    }

    @Test
    void verifyLoadedData() {
        String googleId = "tm.e2e.AAccounts.instr2";
        adminAccountsPage.navigate();
        AccountAttributes account = getAccount(googleId);
        adminAccountsPage.verifyAccountDetails(account);
    }
}
