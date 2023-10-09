package teammates.e2e.cases.playwright.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import teammates.common.datatransfer.FeedbackParticipantType;
import teammates.common.datatransfer.attributes.CourseAttributes;
import teammates.common.datatransfer.attributes.FeedbackQuestionAttributes;
import teammates.common.datatransfer.attributes.FeedbackResponseAttributes;
import teammates.common.datatransfer.attributes.FeedbackSessionAttributes;
import teammates.common.datatransfer.questions.FeedbackMcqResponseDetails;

public class FeedbackSubmitPage extends BasePage {

    public FeedbackSubmitPage(Page page) {
        super(page);
    }

    public void verifyFeedbackSessionDetails(FeedbackSessionAttributes feedbackSession, CourseAttributes course) {
        assertEquals(getCourseId(), feedbackSession.getCourseId());
        assertEquals(getCourseName(), course.getName());
        assertEquals(getCourseInstitute(), course.getInstitute());
        assertEquals(getFeedbackSessionName(), feedbackSession.getFeedbackSessionName());
        assertDateEquals(getOpeningTime(), feedbackSession.getStartTime(), feedbackSession.getTimeZone());
        assertDateEquals(getClosingTime(), feedbackSession.getEndTime(), feedbackSession.getTimeZone());
        assertEquals(getInstructions(), feedbackSession.getInstructions());
    }

    public void verifyNumQuestions(int expected) {
        assertThat(page.locator("[id^='question-submission-form-qn-']")).hasCount(expected);
    }


    public void verifyQuestionDetails(int qnNumber, FeedbackQuestionAttributes questionAttributes) {
        assertEquals(getQuestionBrief(qnNumber), questionAttributes.getQuestionDetailsCopy().getQuestionText());
        verifyVisibilityList(qnNumber, questionAttributes);
        if (questionAttributes.getQuestionDescription() != null) {
            assertEquals(getQuestionDescription(qnNumber), questionAttributes.getQuestionDescription());
        }
    }

    public void verifyLimitedRecipients(int qnNumber, int numRecipients, List<String> recipientNames) {
        Locator recipientDropdowns = getQuestionForm(qnNumber).locator("[id^='recipient-dropdown-qn-']");
        assertThat(recipientDropdowns).hasCount(numRecipients);
        Locator recipientDropDownOptions = recipientDropdowns.first().locator("option");
        assertThat(recipientDropDownOptions).hasCount(recipientNames.size() + 1);
        Collections.sort(recipientNames);
        assertThat(recipientDropDownOptions).containsText(recipientNames.toArray(new String[0]));
    }

    public void verifyRecipients(int qnNumber, List<String> recipientNames, String role) {
        Locator questionForm = getQuestionForm(qnNumber);
        Collections.sort(recipientNames);
        for (int i = 0; i < recipientNames.size(); i++) {
            assertThat(questionForm.locator("#recipient-name-qn-" + qnNumber + "-idx-" + i)).containsText(recipientNames.get(i) + " (" + role + ")");
        }
    }

    public void waitForConfirmationModalAndClickOk() {
        Locator okayButton = page.locator(".modal-btn-ok");
        okayButton.click();
    }

    public void verifyWarningMessageForPartialResponse(int[] unansweredQuestions) {
        getSubmitAllQuestionsButton().click();
        StringBuilder expectedSb = new StringBuilder();
        for (int unansweredQuestion : unansweredQuestions) {
            expectedSb.append(unansweredQuestion).append(", ");
        }
        String expectedString = expectedSb.toString().substring(0, expectedSb.length() - 2) + ". ";
        String warningString = page.locator("#not-answered-questions").textContent();
        assertEquals(warningString.split(": ")[1], expectedString);
        waitForConfirmationModalAndClickOk();
    }

    public void verifyCannotSubmit() {
        Locator submitButton = page.locator("[id^='btn-submit-qn-']");
        assertThat(submitButton).isDisabled();
    }

    public void fillMcqResponse(int qnNumber, String recipient, FeedbackResponseAttributes response) {
        FeedbackMcqResponseDetails responseDetails = (FeedbackMcqResponseDetails) response.getResponseDetailsCopy();
        if (responseDetails.isOther()) {

        } else {
            // List<Locator> optionTexts = 
        }
    }

    private String getCourseId() {
        return page.locator("#course-id").textContent();
    }

    private String getCourseName() {
        return page.locator("#course-name").textContent();
    }

    private String getCourseInstitute() {
        return page.locator("#course-institute").textContent();
    }

    private String getFeedbackSessionName() {
        return page.locator("#fs-name").textContent();
    }

    private String getOpeningTime() {
        return page.locator("#opening-time").textContent();
    }

    private String getClosingTime() {
        return page.locator("#closing-time").textContent();
    }

    private String getInstructions() {
        return page.locator("#instructions").innerHTML();
    }

    private void assertDateEquals(String actual, Instant instant, String timeZone) {
        String dateStrWithAbbr = getDateStringWithAbbr(instant, timeZone);
        String dateStrWithOffset = getDateStringWithOffset(instant, timeZone);

        boolean isExpected = actual.equals(dateStrWithAbbr) || actual.equals(dateStrWithOffset);
        assertTrue(isExpected);
    }

    private String getDateStringWithAbbr(Instant instant, String timeZone) {
        return getDisplayedDateTime(instant, timeZone, "EE, dd MMM, yyyy, hh:mm a z");
    }

    private String getDateStringWithOffset(Instant instant, String timeZone) {
        return getDisplayedDateTime(instant, timeZone, "EE, dd MMM, yyyy, hh:mm a X");
    }

    private Locator getQuestionForm(int qnNumber) {
        Locator questionFormLocator = page.locator("#question-submission-form-qn-" + qnNumber);
        questionFormLocator.scrollIntoViewIfNeeded();
        return questionFormLocator;
    }

    private String getQuestionBrief(int qnNumber) {
        String questionDetails = getQuestionForm(qnNumber).locator(".question-details").textContent();
        return questionDetails.split(": ")[1];
    }

    private String getQuestionDescription(int qnNumber) {
        return getQuestionForm(qnNumber).locator(".question-description").innerHTML();
    }

    private void verifyVisibilityList(int qnNumber, FeedbackQuestionAttributes questionAttributes) {
        if (questionAttributes.getShowResponsesTo().isEmpty()) {
            verifyVisibilityStringPresent(qnNumber, "No-one can see your responses");
        }
        if (questionAttributes.getRecipientType().equals(FeedbackParticipantType.SELF)) {
            verifyVisibilityStringPresent(qnNumber, "You can see your own feedback in the results page later on.");
        }
        for (FeedbackParticipantType viewerType : questionAttributes.getShowResponsesTo()) {
            verifyVisibilityStringPresent(qnNumber, getVisibilityString(questionAttributes, viewerType));
        }
    }

    private void verifyVisibilityStringPresent(int qnNumber, String expectedString) {
        assertThat(getQuestionForm(qnNumber).locator(".visibility-list")).containsText(expectedString);
    }

    private String getVisibilityString(FeedbackQuestionAttributes questionAttributes,
                                       FeedbackParticipantType viewerType) {
        if (!questionAttributes.getShowResponsesTo().contains(viewerType)) {
            return "";
        }

        StringBuilder message = new StringBuilder(getViewerString(viewerType, questionAttributes.getRecipientType()));
        message.append(" can see your response");
        if (questionAttributes.getShowRecipientNameTo().contains(viewerType)) {
            message.append(", the name of the recipient");
            if (questionAttributes.getShowGiverNameTo().contains(viewerType)) {
                message.append(", and your name");
            } else {
                message.append(", but not your name");
            }
        } else {
            if (questionAttributes.getShowGiverNameTo().contains(viewerType)) {
                message.append(", and your name, but not the name of the recipient");
            } else {
                message.append(", but not the name of the recipient, or your name");
            }
        }
        return message.toString();
    }

    private String getViewerString(FeedbackParticipantType viewerType, FeedbackParticipantType recipientType) {
        switch (viewerType) {
        case RECEIVER:
            return "The receiving " + getRecipientString(recipientType);
        case OWN_TEAM_MEMBERS:
            return "Your team members";
        case STUDENTS:
            return "Other students in the course";
        case INSTRUCTORS:
            return "Instructors in this course";
        default:
            throw new RuntimeException("Unknown viewer type");
        }
    }

    private String getRecipientString(FeedbackParticipantType recipientType) {
        switch (recipientType) {
        case TEAMS:
        case TEAMS_EXCLUDING_SELF:
        case TEAMS_IN_SAME_SECTION:
            return "teams";
        case OWN_TEAM_MEMBERS:
            return "student";
        case STUDENTS:
        case STUDENTS_EXCLUDING_SELF:
        case STUDENTS_IN_SAME_SECTION:
            return "students";
        case INSTRUCTORS:
            return "instructors";
        default:
            throw new RuntimeException("Unknown recipientType");
        }
    }

    private Locator getSubmitAllQuestionsButton() {
        return page.locator("#btn-submit");
    }

    // private Locator getMcqSection(int qnNumber, String recipient) {

    // }

    // private List<Locator> getMcqOptions(int qnNumber, String recipient) {

    // }
}
