package teammates.e2e.cases.playwright;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import teammates.common.datatransfer.DataBundle;
import teammates.common.datatransfer.attributes.AccountAttributes;
import teammates.common.datatransfer.attributes.AccountRequestAttributes;
import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.DeadlineExtensionAttributes;
import teammates.common.datatransfer.attributes.FeedbackQuestionAttributes;
import teammates.common.datatransfer.attributes.FeedbackResponseAttributes;
import teammates.common.datatransfer.attributes.FeedbackResponseCommentAttributes;
import teammates.common.datatransfer.attributes.FeedbackSessionAttributes;
import teammates.common.datatransfer.attributes.InstructorAttributes;
import teammates.common.datatransfer.attributes.NotificationAttributes;
import teammates.common.datatransfer.attributes.StudentAttributes;
import teammates.common.exception.HttpRequestFailedException;
import teammates.common.util.AppUrl;
import teammates.common.util.Const;
import teammates.e2e.cases.playwright.pages.BasePage;
import teammates.e2e.cases.playwright.pages.LoginPage;
import teammates.e2e.util.BackDoor;
import teammates.e2e.util.TestProperties;
import teammates.test.BaseTestCaseWithDatabaseAccess;

public abstract class BaseE2ETest extends BaseTestCaseWithDatabaseAccess {

 /**
  * Backdoor used to call APIs.
  */
  protected static final BackDoor BACKDOOR = BackDoor.getInstance();
  // Shared between all tests in this class.
  Playwright playwright;
  Browser browser;

  // New instance for each test method.
  BrowserContext context;
  Page page;

  @BeforeClass
  void launchBrowser() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
  }

  @AfterClass
  void closeBrowser() {
    playwright.close();
  }

  @BeforeMethod
  void createContextAndPage() {
    context = browser.newContext();
    page = context.newPage();
  }

  @AfterMethod
  void closeContext() {
    context.close();
  }

  protected static AppUrl createFrontendUrl(String relativeUrl) {
    return new AppUrl(TestProperties.TEAMMATES_FRONTEND_URL + relativeUrl);
  }


    protected static AppUrl createBackendUrl(String relativeUrl) {
        return new AppUrl(TestProperties.TEAMMATES_BACKEND_URL + relativeUrl);
    }

    protected void logout() {
        AppUrl url = createBackendUrl(Const.WebPageURIs.LOGOUT);
        if (!TestProperties.TEAMMATES_FRONTEND_URL.equals(TestProperties.TEAMMATES_BACKEND_URL)) {
            url = url.withParam("frontendUrl", TestProperties.TEAMMATES_FRONTEND_URL);
        }

        page.navigate(url.toAbsoluteString());
    }


    protected <T extends BasePage> T loginToPage(AppUrl url, Class<T> typeOfPage, String userId) {
        // This will be redirected to the dev server login page.
        page.navigate(url.toAbsoluteString());

        LoginPage loginPage = BasePage.getNewPageInstance(page, LoginPage.class);
        loginPage.loginToDevServer(userId);

        return getNewPageInstance(url, typeOfPage);
    }

    /**
     * Visits the URL and gets the page object representation of the visited web page in the browser.
     */
    protected <T extends BasePage> T getNewPageInstance(AppUrl url, Class<T> typeOfPage) {
        page.navigate(url.toAbsoluteString());
        return BasePage.getNewPageInstance(page, typeOfPage);
    }

  AccountAttributes getAccount(String googleId) {
    return BACKDOOR.getAccount(googleId);
 }

    @Override
    protected AccountAttributes getAccount(AccountAttributes account) {
        return getAccount(account.getGoogleId());
    }

    CourseAttributes getCourse(String courseId) {
        return BACKDOOR.getCourse(courseId);
    }

    @Override
    protected CourseAttributes getCourse(CourseAttributes course) {
        return getCourse(course.getId());
    }

    CourseAttributes getArchivedCourse(String instructorId, String courseId) {
        return BACKDOOR.getArchivedCourse(instructorId, courseId);
    }

    FeedbackQuestionAttributes getFeedbackQuestion(String courseId, String feedbackSessionName, int qnNumber) {
        return BACKDOOR.getFeedbackQuestion(courseId, feedbackSessionName, qnNumber);
    }

    @Override
    protected FeedbackQuestionAttributes getFeedbackQuestion(FeedbackQuestionAttributes fq) {
        return getFeedbackQuestion(fq.getCourseId(), fq.getFeedbackSessionName(), fq.getQuestionNumber());
    }

    FeedbackResponseCommentAttributes getFeedbackResponseComment(String feedbackResponseId) {
        return BACKDOOR.getFeedbackResponseComment(feedbackResponseId);
    }

    @Override
    protected FeedbackResponseCommentAttributes getFeedbackResponseComment(FeedbackResponseCommentAttributes frc) {
        return getFeedbackResponseComment(frc.getFeedbackResponseId());
    }

    FeedbackResponseAttributes getFeedbackResponse(String feedbackQuestionId, String giver, String recipient) {
        return BACKDOOR.getFeedbackResponse(feedbackQuestionId, giver, recipient);
    }

    @Override
    protected FeedbackResponseAttributes getFeedbackResponse(FeedbackResponseAttributes fr) {
        return getFeedbackResponse(fr.getFeedbackQuestionId(), fr.getGiver(), fr.getRecipient());
    }

    FeedbackSessionAttributes getFeedbackSession(String courseId, String feedbackSessionName) {
        return BACKDOOR.getFeedbackSession(courseId, feedbackSessionName);
    }

    @Override
    protected FeedbackSessionAttributes getFeedbackSession(FeedbackSessionAttributes fs) {
        return getFeedbackSession(fs.getCourseId(), fs.getFeedbackSessionName());
    }

    FeedbackSessionAttributes getSoftDeletedSession(String feedbackSessionName, String instructorId) {
        return BACKDOOR.getSoftDeletedSession(feedbackSessionName, instructorId);
    }

    InstructorAttributes getInstructor(String courseId, String instructorEmail) {
        return BACKDOOR.getInstructor(courseId, instructorEmail);
    }

    @Override
    protected InstructorAttributes getInstructor(InstructorAttributes instructor) {
        return getInstructor(instructor.getCourseId(), instructor.getEmail());
    }

    /**
     * Gets registration key for a given instructor.
     */
    protected String getKeyForInstructor(String courseId, String instructorEmail) {
        return getInstructor(courseId, instructorEmail).getKey();
    }

    @Override
    protected StudentAttributes getStudent(StudentAttributes student) {
        return BACKDOOR.getStudent(student.getCourse(), student.getEmail());
    }

    /**
     * Gets registration key for a given student.
     */
    protected String getKeyForStudent(StudentAttributes student) {
        return getStudent(student).getKey();
    }

    @Override
    protected AccountRequestAttributes getAccountRequest(AccountRequestAttributes accountRequest) {
        return BACKDOOR.getAccountRequest(accountRequest.getEmail(), accountRequest.getInstitute());
    }

    NotificationAttributes getNotification(String notificationId) {
        return BACKDOOR.getNotification(notificationId);
    }

    @Override
    protected NotificationAttributes getNotification(NotificationAttributes notification) {
        return getNotification(notification.getNotificationId());
    }

    @Override
    protected DeadlineExtensionAttributes getDeadlineExtension(DeadlineExtensionAttributes deadlineExtension) {
        return BACKDOOR.getDeadlineExtension(
                deadlineExtension.getCourseId(), deadlineExtension.getFeedbackSessionName(),
                deadlineExtension.getUserEmail(), deadlineExtension.getIsInstructor());
    }


    @Override
    protected boolean doRemoveAndRestoreDataBundle(DataBundle testData) {
        try {
            BACKDOOR.removeAndRestoreDataBundle(testData);
            return true;
        } catch (HttpRequestFailedException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    protected boolean doPutDocuments(DataBundle testData) {
        try {
            BACKDOOR.putDocuments(testData);
            return true;
        } catch (HttpRequestFailedException e) {
            e.printStackTrace();
            return false;
        }
    }
}
