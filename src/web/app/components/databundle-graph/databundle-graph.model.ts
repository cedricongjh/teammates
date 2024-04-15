export interface DataBundleEntity {
  id?: string;
  [key: string]: any;
}

interface FeedbackSessionDataBundleEntity extends DataBundleEntity {
  course: DataBundleEntity;
}

interface FeedbackQuestionDataBundleEntity extends DataBundleEntity {
  feedbackSession: DataBundleEntity;
}

interface FeedbackResponseDataBundleEntity extends DataBundleEntity {
  feedbackQuestion: DataBundleEntity;
}

interface FeedbackResponseCommentDataBundleEntity extends DataBundleEntity {
  feedbackResponse: DataBundleEntity;
  giverSection: DataBundleEntity;
  recipientSection: DataBundleEntity;
}

interface SectionDataBundleEntity extends DataBundleEntity {
  course: DataBundleEntity;
}

export interface DataBundle {
  courses: { [key: string]: DataBundleEntity }
  feedbackSessions: { [key: string]: FeedbackSessionDataBundleEntity }
  feedbackQuestions: { [key: string]: FeedbackQuestionDataBundleEntity }
  feedbackResponses: { [key: string]: FeedbackResponseDataBundleEntity }
  feedbackResponseComments: { [key: string]: FeedbackResponseCommentDataBundleEntity }
  sections: { [key: string]: SectionDataBundleEntity }
}

export const EMPTY_DATA_BUNDLE: DataBundle = {
  courses: {},
  feedbackSessions: {},
  feedbackQuestions: {},
  feedbackResponses: {},
  feedbackResponseComments: {},
  sections: {}
}
