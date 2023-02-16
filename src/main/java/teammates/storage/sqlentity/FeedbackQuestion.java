package teammates.storage.sqlentity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import teammates.common.datatransfer.FeedbackParticipantType;
import teammates.common.datatransfer.questions.FeedbackQuestionType;
import teammates.common.util.FieldValidator;

import teammates.storage.sqlconverter.FeedbackParticipantTypeListConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Represents a Question entity.
 */
@Entity
@Table(name = "Question")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class FeedbackQuestion extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sessionId")
    private FeedbackSession feedbackSession;

    @Column(nullable = false)
    private Integer questionNumber;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FeedbackQuestionType questionType;

    @Column(nullable = false)
    private String questionText;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FeedbackParticipantType giverType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FeedbackParticipantType recipientType;

    @Column(nullable = false)
    private Integer numOfEntitiesToGiveFeedbackTo;

    @Column(nullable = false)
    private List<FeedbackParticipantType> showResponsesTo;

    @Column(nullable = false)
    private List<FeedbackParticipantType> showGiverNameTo;

    @Column(nullable = false)
    @Convert(converter = FeedbackParticipantTypeListConverter.class)
    private List<FeedbackParticipantType> showRecipientNameTo;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column
    private Instant updatedAt;

    protected FeedbackQuestion() {
        // required by Hibernate
    }

    public FeedbackQuestion(
        FeedbackSession feedbackSession, Integer questionNumber,
        String description, FeedbackQuestionType questionType,
        String questionText, FeedbackParticipantType giverType,
        Integer numOfEntitiesToGiveFeedbackTo, List<FeedbackParticipantType> showReponsesTo,
        List<FeedbackParticipantType> showGiverNameTo, List<FeedbackParticipantType> showReceipientNameTo
         ) {
        this.setFeedbackSession(feedbackSession);
        this.setQuestionNumber(questionNumber);
        this.setDescription(description);
        this.setQuestionType(questionType);
        this.setQuestionText(questionText);
        this.setGiverType(giverType);
        this.setRecipientType(recipientType);
        this.setNumOfEntitiesToGiveFeedbackTo(numOfEntitiesToGiveFeedbackTo);
        this.setShowResponsesTo(showResponsesTo);
        this.setShowGiverNameTo(showGiverNameTo);
        this.setShowRecipientNameTo(showRecipientNameTo);
    }

    @Override
    public List<String> getInvalidityInfo() {
        List<String> errors = new ArrayList<>();

        errors.addAll(FieldValidator.getValidityInfoForFeedbackParticipantType(giverType, recipientType));

        errors.addAll(FieldValidator.getValidityInfoForFeedbackResponseVisibility(showResponsesTo,
                showGiverNameTo,
                showRecipientNameTo));

        return errors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FeedbackSession getFeedbackSession() {
        return feedbackSession;
    }

    public void setFeedbackSession(FeedbackSession feedbackSession) {
        this.feedbackSession = feedbackSession;
    }

    public Integer getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(Integer questionNumber) {
        this.questionNumber = questionNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FeedbackQuestionType getQuestionType() {
        return questionType;
    }

    public void setQuestionType(FeedbackQuestionType questionType) {
        this.questionType = questionType;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public FeedbackParticipantType getGiverType() {
        return giverType;
    }

    public void setGiverType(FeedbackParticipantType giverType) {
        this.giverType = giverType;
    }

    public FeedbackParticipantType getRecipientType() {
        return recipientType;
    }

    public void setRecipientType(FeedbackParticipantType recipientType) {
        this.recipientType = recipientType;
    }

    public Integer getNumOfEntitiesToGiveFeedbackTo() {
        return numOfEntitiesToGiveFeedbackTo;
    }

    public void setNumOfEntitiesToGiveFeedbackTo(Integer numOfEntitiesToGiveFeedbackTo) {
        this.numOfEntitiesToGiveFeedbackTo = numOfEntitiesToGiveFeedbackTo;
    }

    public List<FeedbackParticipantType> getShowResponsesTo() {
        return showResponsesTo;
    }

    public void setShowResponsesTo(List<FeedbackParticipantType> showResponsesTo) {
        this.showResponsesTo = showResponsesTo;
    }

    public List<FeedbackParticipantType> getShowGiverNameTo() {
        return showGiverNameTo;
    }

    public void setShowGiverNameTo(List<FeedbackParticipantType> showGiverNameTo) {
        this.showGiverNameTo = showGiverNameTo;
    }

    public List<FeedbackParticipantType> getShowRecipientNameTo() {
        return showRecipientNameTo;
    }

    public void setShowRecipientNameTo(List<FeedbackParticipantType> showRecipientNameTo) {
        this.showRecipientNameTo = showRecipientNameTo;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Question [id=" + id + ", questionNumber=" + questionNumber + ", description=" + description
                + ", questionType=" + questionType
                + ", questionText=" + questionText + ", giverType=" + giverType + ", recipientType=" + recipientType
                + ", numOfEntitiesToGiveFeedbackTo=" + numOfEntitiesToGiveFeedbackTo + ", showResponsesTo="
                + showResponsesTo + ", showGiverNameTo=" + showGiverNameTo + ", showRecipientNameTo="
                + showRecipientNameTo + ", isClosingEmailEnabled=" + ", createdAt=" + createdAt + ", updatedAt="
                + updatedAt + "]";
    }

    @Override
    public int hashCode() {
        // FeedbackQuestion ID uniquely identifies a notification.
        return this.id.hashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == null) {
            return false;
        } else if (this == other) {
            return true;
        } else if (this.getClass() == other.getClass()) {
            FeedbackQuestion otherQuestion = (FeedbackQuestion) other;
            return Objects.equals(this.id, otherQuestion.id);
        } else {
            return false;
        }
    }
}

