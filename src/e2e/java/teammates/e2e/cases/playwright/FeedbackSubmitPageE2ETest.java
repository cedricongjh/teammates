package teammates.e2e.cases.playwright;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import teammates.common.datatransfer.DataBundle;
import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.FeedbackQuestionAttributes;
import teammates.common.datatransfer.attributes.FeedbackResponseAttributes;
import teammates.common.datatransfer.attributes.FeedbackSessionAttributes;
import teammates.common.datatransfer.attributes.InstructorAttributes;
import teammates.common.datatransfer.attributes.StudentAttributes;
import teammates.common.datatransfer.questions.FeedbackMcqResponseDetails;
import teammates.common.util.AppUrl;
import teammates.common.util.Const;
import teammates.e2e.cases.playwright.pages.FeedbackSubmitPage;
import teammates.e2e.cases.playwright.pages.LoginPage;
import teammates.e2e.util.TestProperties;

public class FeedbackSubmitPageE2ETest extends BaseE2ETest {

    protected DataBundle testData;
    LoginPage loginPage;
    FeedbackSubmitPage submitPage;
    private StudentAttributes student;
    private InstructorAttributes instructor;
    private CourseAttributes course;
    private FeedbackSessionAttributes openSession;
    private FeedbackSessionAttributes closedSession;
    private FeedbackSessionAttributes gracePeriodSession;

    @BeforeMethod
    void prepareTestData() {
        testData = loadDataBundle("/FeedbackSubmitPageE2ETest.json");
        testData.feedbackSessions.get("Grace Period Session").setEndTime(Instant.now());
        student = testData.students.get("Alice");
        student.setEmail(TestProperties.TEST_EMAIL);
        removeAndRestoreDataBundle(testData);

        instructor = testData.instructors.get("FSubmit.instr");
        course = testData.courses.get("FSubmit.CS2104");
        openSession = testData.feedbackSessions.get("Open Session");
        closedSession = testData.feedbackSessions.get("Closed Session");
        gracePeriodSession = testData.feedbackSessions.get("Grace Period Session");

        loginPage = new LoginPage(page);
        AppUrl loginPageUrl = createBackendUrl("/devServerLogin");
        loginPage.navigateWithAppUrl(loginPageUrl);
        loginPage.loginToDevServer(instructor.getGoogleId());
        AppUrl url = createFrontendUrl(Const.WebPageURIs.INSTRUCTOR_SESSION_SUBMISSION_PAGE)
                .withCourseId(openSession.getCourseId())
                .withSessionName(openSession.getFeedbackSessionName());
        submitPage = new FeedbackSubmitPage(page);
        submitPage.navigateWithAppUrl(url);
    }

    @Test
    void testAll() {
        ______TS("verify loaded session data");
        submitPage.verifyFeedbackSessionDetails(openSession, course);
        
        ______TS("questions with giver type instructor");
        submitPage.verifyNumQuestions(1);
        submitPage.verifyQuestionDetails(1, testData.feedbackQuestions.get("qn5InSession1"));

        ______TS("questions with giver type students");
        logout();
        AppUrl loginPageUrl = createBackendUrl("/devServerLogin");
        loginPage.navigateWithAppUrl(loginPageUrl);
        loginPage.loginToDevServer(student.getGoogleId());
        submitPage.navigateWithAppUrl(getStudentSubmitPageUrl(student, openSession));

        submitPage.verifyNumQuestions(4);
        submitPage.verifyQuestionDetails(1, testData.feedbackQuestions.get("qn1InSession1"));
        submitPage.verifyQuestionDetails(2, testData.feedbackQuestions.get("qn2InSession1"));
        submitPage.verifyQuestionDetails(3, testData.feedbackQuestions.get("qn3InSession1"));
        submitPage.verifyQuestionDetails(4, testData.feedbackQuestions.get("qn4InSession1"));

        ______TS("verify recipients: students");
        submitPage.verifyLimitedRecipients(1, 3, getOtherStudents(student));

        ______TS("verify recipients: instructors");
        submitPage.verifyRecipients(2, getInstructors(), "Instructor");

        ______TS("verify recipients: team mates");
        submitPage.verifyRecipients(3, getTeammates(student), "Student");

        ______TS("verify recipients: teams");
        submitPage.verifyRecipients(4, getOtherTeams(student), "Team");

        ______TS("submit partial response");
        int[] unansweredQuestions = { 1, 2, 3, 4 };
        submitPage.verifyWarningMessageForPartialResponse(unansweredQuestions);

        ______TS("cannot submit in closed session");
        AppUrl closedSessionUrl = getStudentSubmitPageUrl(student, closedSession);
        submitPage.navigateWithAppUrl(closedSessionUrl);
        submitPage.verifyCannotSubmit();

        ______TS("can submit in grace period");
        AppUrl gracePeriodSessionUrl = getStudentSubmitPageUrl(student, gracePeriodSession);
        submitPage.navigateWithAppUrl(gracePeriodSessionUrl);
                FeedbackQuestionAttributes question = testData.feedbackQuestions.get("qn1InGracePeriodSession");
        String questionId = getFeedbackQuestion(question).getId();
        String recipient = "Team 2";
        FeedbackResponseAttributes response = getMcqResponse(questionId, recipient, false, "UI");
        submitPage.fillMcqResponse(1, recipient, response);
        submitPage.clickSubmitQuestionButton(1);

        verifyPresentInDatabase(response);

        ______TS("can submit only one question");

        response = getMcqResponse(questionId, recipient, false, "Algo");
        submitPage.fillMcqResponse(1, recipient, response);

        FeedbackQuestionAttributes question2 = testData.feedbackQuestions.get("qn2InGracePeriodSession");
        String question2Id = getFeedbackQuestion(question2).getId();
        FeedbackResponseAttributes response2 = getMcqResponse(question2Id, recipient, false, "Teammates Test");
        submitPage.fillMcqResponse(2, recipient, response2);

        submitPage.clickSubmitQuestionButton(1);
        // Question 2 response should not be persisted as only question 1 is submitted
        verifyAbsentInDatabase(response2);
        verifyPresentInDatabase(response);

        page.pause();
    }

    private AppUrl getStudentSubmitPageUrl(StudentAttributes student, FeedbackSessionAttributes session) {
        return createFrontendUrl(Const.WebPageURIs.STUDENT_SESSION_SUBMISSION_PAGE)
                .withCourseId(student.getCourse())
                .withSessionName(session.getFeedbackSessionName());
    }

    private List<String> getOtherStudents(StudentAttributes currentStudent) {
        return testData.students.values().stream()
                .filter(s -> !s.equals(currentStudent))
                .map(s -> s.getName())
                .collect(Collectors.toList());
    }

    private List<String> getInstructors() {
        return testData.instructors.values().stream()
                .map(i -> i.getName())
                .collect(Collectors.toList());
    }

    private List<String> getTeammates(StudentAttributes currentStudent) {
        return testData.students.values().stream()
                .filter(s -> !s.equals(currentStudent) && s.getTeam().equals(currentStudent.getTeam()))
                .map(s -> s.getName())
                .collect(Collectors.toList());
    }

    private List<String> getOtherTeams(StudentAttributes currentStudent) {
        return new ArrayList<>(testData.students.values().stream()
                .filter(s -> !s.getTeam().equals(currentStudent.getTeam()))
                .map(s -> s.getTeam())
                .collect(Collectors.toSet()));
    }

    private FeedbackResponseAttributes getMcqResponse(String questionId, String recipient, boolean isOther, String answer) {
        FeedbackMcqResponseDetails details = new FeedbackMcqResponseDetails();
        if (isOther) {
            details.setOther(true);
            details.setOtherFieldContent(answer);
        } else {
            details.setAnswer(answer);
        }
        return FeedbackResponseAttributes.builder(questionId, student.getEmail(), recipient)
                .withResponseDetails(details)
                .build();
    }
}
