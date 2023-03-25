package teammates.storage.sqlentity.responses;

import teammates.common.datatransfer.questions.FeedbackNumericalScaleResponseDetails;
import teammates.common.datatransfer.questions.FeedbackResponseDetails;
import teammates.storage.sqlentity.FeedbackQuestion;
import teammates.storage.sqlentity.FeedbackResponse;
import teammates.storage.sqlentity.Section;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;

/**
 * Represents a feedback numerical scale response.
 */
@Entity
public class FeedbackNumericalScaleResponse extends FeedbackResponse {

    @Column(nullable = false)
    @Convert(converter = FeedbackNumericalScaleResponseDetailsConverter.class)
    private FeedbackNumericalScaleResponseDetails answer;

    protected FeedbackNumericalScaleResponse() {
        // required by Hibernate
    }

    public FeedbackNumericalScaleResponse(
            FeedbackQuestion feedbackQuestion, String giver,
            Section giverSection, String receiver, Section receiverSection,
            FeedbackResponseDetails responseDetails
    ) {
        super(feedbackQuestion, giver, giverSection, receiver, receiverSection);
        this.setAnswer((FeedbackNumericalScaleResponseDetails) responseDetails);
    }

    public FeedbackNumericalScaleResponseDetails getAnswer() {
        return answer;
    }

    public void setAnswer(FeedbackNumericalScaleResponseDetails answer) {
        this.answer = answer;
    }

    @Override
    public FeedbackResponseDetails getFeedbackResponseDetailsCopy() {
        return answer.getDeepCopy();
    }

    @Override
    public String toString() {
        return "FeedbackTextResponse [id=" + super.getId()
            + ", createdAt=" + super.getCreatedAt() + ", updatedAt=" + super.getUpdatedAt() + "]";
    }

    /**
     * Converter for FeedbackNumericalScaleQuestion specific attributes.
     */
    @Converter
    public static class FeedbackNumericalScaleResponseDetailsConverter
            extends FeedbackResponseDetailsConverter {
    }
}
