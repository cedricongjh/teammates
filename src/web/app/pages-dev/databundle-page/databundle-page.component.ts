import { Component, OnChanges, OnInit } from '@angular/core';
import { SimpleModalService } from '../../../services/simple-modal.service';
import { Link, Node } from '../../components/force-directed-graph/force-directed-graph.model';
import { SimpleModalType } from '../../components/simple-modal/simple-modal-type';

interface DataBundleEntity {
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

interface DataBundle {
  courses: { [key: string]: DataBundleEntity }
  feedbackSessions: { [key: string]: FeedbackSessionDataBundleEntity }
  feedbackQuestions: { [key: string]: FeedbackQuestionDataBundleEntity }
  feedbackResponses: { [key: string]: FeedbackResponseDataBundleEntity }
  feedbackResponseComments: { [key: string]: FeedbackResponseCommentDataBundleEntity }
  sections: { [key: string]: SectionDataBundleEntity }
}

@Component({
  selector: 'tm-databundle-page',
  templateUrl: './databundle-page.component.html',
  styleUrls: ['./databundle-page.component.scss']
})
export class DatabundlePageComponent implements OnInit, OnChanges {

  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private simpleModalService: SimpleModalService) {}

  ngOnInit(): void {
    const data: DataBundle = {
      "courses": {
        "course1": {
          "createdAt": "2012-04-01T23:59:00Z",
          "id": "course-1",
          "name": "Typical Course 1",
          "institute": "TEAMMATES Test Institute 0",
          "timeZone": "Africa/Johannesburg"
        },
        "course2": {
          "createdAt": "2012-04-01T23:59:00Z",
          "id": "course-2",
          "name": "Typical Course 2",
          "institute": "TEAMMATES Test Institute 1",
          "timeZone": "Asia/Singapore"
        },
        "course3": {
          "createdAt": "2012-04-01T23:59:00Z",
          "id": "course-3",
          "name": "Typical Course 3",
          "institute": "TEAMMATES Test Institute 1",
          "timeZone": "Asia/Singapore"
        },
        "course4": {
          "createdAt": "2012-04-01T23:59:00Z",
          "id": "course-4",
          "name": "Typical Course 4",
          "institute": "TEAMMATES Test Institute 1",
          "timeZone": "Asia/Singapore"
        },
        "archivedCourse": {
          "id": "archived-course",
          "name": "Archived Course",
          "institute": "TEAMMATES Test Institute 2",
          "timeZone": "UTC"
        },
        "unregisteredCourse": {
          "id": "unregistered-course",
          "name": "Unregistered Course",
          "institute": "TEAMMATES Test Institute 3",
          "timeZone": "UTC"
        }
      },
      "sections": {
        "section1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000201",
          "course": {
            "id": "course-1"
          },
          "name": "Section 1"
        },
        "section1InCourse2": {
          "id": "00000000-0000-4000-8000-000000000202",
          "course": {
            "id": "course-2"
          },
          "name": "Section 2"
        },
        "section2InCourse1": {
          "id": "00000000-0000-4000-8000-000000000203",
          "course": {
            "id": "course-1"
          },
          "name": "Section 3"
        },
        "section1InCourse3": {
            "id": "00000000-0000-4000-8000-000000000204",
            "course": {
              "id": "course-3"
            },
            "name": "Section 1"
          }
      },
      "feedbackSessions": {
        "session1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000701",
          "course": {
            "id": "course-1"
          },
          "name": "First feedback session",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2012-04-01T22:00:00Z",
          "endTime": "2027-04-30T22:00:00Z",
          "sessionVisibleFromTime": "2012-03-28T22:00:00Z",
          "resultsVisibleFromTime": "2013-05-01T22:00:00Z",
          "gracePeriod": 10,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": false,
          "isClosedEmailSent": false,
          "isPublishedEmailSent": true
        },
        "session2InTypicalCourse": {
          "id": "00000000-0000-4000-8000-000000000702",
          "course": {
            "id": "course-1"
          },
          "name": "Second feedback session",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2013-06-01T22:00:00Z",
          "endTime": "2026-04-28T22:00:00Z",
          "sessionVisibleFromTime": "2013-03-20T22:00:00Z",
          "resultsVisibleFromTime": "2026-04-29T22:00:00Z",
          "gracePeriod": 5,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": false,
          "isClosedEmailSent": false,
          "isPublishedEmailSent": false
        },
        "unpublishedSession1InTypicalCourse": {
          "id": "00000000-0000-4000-8000-000000000703",
          "course": {
            "id": "course-1"
          },
          "name": "Unpublished feedback session",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2013-06-01T22:00:00Z",
          "endTime": "2026-04-28T22:00:00Z",
          "sessionVisibleFromTime": "2013-03-20T22:00:00Z",
          "resultsVisibleFromTime": "2027-04-27T22:00:00Z",
          "gracePeriod": 5,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": false,
          "isClosedEmailSent": false,
          "isPublishedEmailSent": false
        },
        "ongoingSession1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000704",
          "course": {
            "id": "course-1"
          },
          "name": "Ongoing session 1 in course 1",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2012-01-19T22:00:00Z",
          "endTime": "2012-01-25T22:00:00Z",
          "sessionVisibleFromTime": "2012-01-19T22:00:00Z",
          "resultsVisibleFromTime": "2012-02-02T22:00:00Z",
          "gracePeriod": 10,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": true,
          "isClosedEmailSent": true,
          "isPublishedEmailSent": true
        },
        "ongoingSession2InCourse1": {
          "id": "00000000-0000-4000-8000-000000000705",
          "course": {
            "id": "course-1"
          },
          "name": "Ongoing session 2 in course 1",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2012-01-26T22:00:00Z",
          "endTime": "2012-02-02T22:00:00Z",
          "sessionVisibleFromTime": "2012-01-19T22:00:00Z",
          "resultsVisibleFromTime": "2012-02-02T22:00:00Z",
          "gracePeriod": 10,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": true,
          "isClosedEmailSent": true,
          "isPublishedEmailSent": true
        },
        "ongoingSession3InCourse1": {
          "id": "00000000-0000-4000-8000-000000000706",
          "course": {
            "id": "course-1"
          },
          "name": "Ongoing session 3 in course 1",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2012-01-26T10:00:00Z",
          "endTime": "2012-01-27T10:00:00Z",
          "sessionVisibleFromTime": "2012-01-19T22:00:00Z",
          "resultsVisibleFromTime": "2012-02-02T22:00:00Z",
          "gracePeriod": 10,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": true,
          "isClosedEmailSent": true,
          "isPublishedEmailSent": true
        },
        "ongoingSession1InCourse3": {
          "id": "00000000-0000-4000-8000-000000000707",
          "course": {
            "id": "course-3"
          },
          "name": "Ongoing session 1 in course 3",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2012-01-27T22:00:00Z",
          "endTime": "2012-02-02T22:00:00Z",
          "sessionVisibleFromTime": "2012-01-19T22:00:00Z",
          "resultsVisibleFromTime": "2012-02-02T22:00:00Z",
          "gracePeriod": 10,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": true,
          "isClosedEmailSent": true,
          "isPublishedEmailSent": true
        },
        "ongoingSession2InCourse3": {
          "id": "00000000-0000-4000-8000-000000000707",
          "course": {
            "id": "course-3"
          },
          "name": "Ongoing session 2 in course 3",
          "creatorEmail": "instr1@teammates.tmt",
          "instructions": "Please please fill in the following questions.",
          "startTime": "2012-01-19T22:00:00Z",
          "endTime": "2027-04-30T22:00:00Z",
          "sessionVisibleFromTime": "2012-01-19T22:00:00Z",
          "resultsVisibleFromTime": "2012-02-02T22:00:00Z",
          "gracePeriod": 10,
          "isOpeningEmailEnabled": true,
          "isClosingEmailEnabled": true,
          "isPublishedEmailEnabled": true,
          "isOpeningSoonEmailSent": true,
          "isOpenEmailSent": true,
          "isClosingSoonEmailSent": true,
          "isClosedEmailSent": true,
          "isPublishedEmailSent": true
        }
      },
      "feedbackQuestions": {
        "qn1InSession1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000801",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000701"
          },
          "questionDetails": {
            "questionType": "TEXT",
            "questionText": "What is the best selling point of your product?"
          },
          "description": "This is a text question.",
          "questionNumber": 1,
          "giverType": "STUDENTS",
          "recipientType": "SELF",
          "numOfEntitiesToGiveFeedbackTo": 1,
          "showResponsesTo": ["INSTRUCTORS"],
          "showGiverNameTo": ["INSTRUCTORS"],
          "showRecipientNameTo": ["INSTRUCTORS"]
        },
        "qn2InSession1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000802",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000701"
          },
          "questionDetails": {
            "recommendedLength": 0,
            "questionType": "TEXT",
            "questionText": "Rate 1 other student's product"
          },
          "description": "This is a text question.",
          "questionNumber": 2,
          "giverType": "STUDENTS",
          "recipientType": "STUDENTS_EXCLUDING_SELF",
          "numOfEntitiesToGiveFeedbackTo": 1,
          "showResponsesTo": ["INSTRUCTORS", "RECEIVER"],
          "showGiverNameTo": ["INSTRUCTORS"],
          "showRecipientNameTo": ["INSTRUCTORS", "RECEIVER"]
        },
        "qn3InSession1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000803",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000701"
          },
          "questionDetails": {
            "questionType": "TEXT",
            "questionText": "My comments on the class"
          },
          "description": "This is a text question.",
          "questionNumber": 3,
          "giverType": "SELF",
          "recipientType": "NONE",
          "numOfEntitiesToGiveFeedbackTo": -100,
          "showResponsesTo": [
            "RECEIVER",
            "OWN_TEAM_MEMBERS",
            "STUDENTS",
            "INSTRUCTORS"
          ],
          "showGiverNameTo": [
            "RECEIVER",
            "OWN_TEAM_MEMBERS",
            "STUDENTS",
            "INSTRUCTORS"
          ],
          "showRecipientNameTo": [
            "RECEIVER",
            "OWN_TEAM_MEMBERS",
            "STUDENTS",
            "INSTRUCTORS"
          ]
        },
        "qn4InSession1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000804",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000701"
          },
          "questionDetails": {
            "questionType": "TEXT",
            "questionText": "Instructor comments on the class"
          },
          "description": "This is a text question.",
          "questionNumber": 4,
          "giverType": "INSTRUCTORS",
          "recipientType": "NONE",
          "numOfEntitiesToGiveFeedbackTo": -100,
          "showResponsesTo": [
            "RECEIVER",
            "OWN_TEAM_MEMBERS",
            "STUDENTS",
            "INSTRUCTORS"
          ],
          "showGiverNameTo": [
            "RECEIVER",
            "OWN_TEAM_MEMBERS",
            "STUDENTS",
            "INSTRUCTORS"
          ],
          "showRecipientNameTo": [
            "RECEIVER",
            "OWN_TEAM_MEMBERS",
            "STUDENTS",
            "INSTRUCTORS"
          ]
        },
        "qn5InSession1InCourse1": {
          "id": "00000000-0000-4000-8000-000000000805",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000701"
          },
          "questionDetails": {
            "recommendedLength": 100,
            "questionText": "New format Text question",
            "questionType": "TEXT"
          },
          "description": "This is a text question.",
          "questionNumber": 5,
          "giverType": "SELF",
          "recipientType": "NONE",
          "numOfEntitiesToGiveFeedbackTo": -100,
          "showResponsesTo": ["INSTRUCTORS"],
          "showGiverNameTo": ["INSTRUCTORS"],
          "showRecipientNameTo": ["INSTRUCTORS"]
        },
        "qn6InSession1InCourse1NoResponses": {
          "id": "00000000-0000-4000-8000-000000000806",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000701"
          },
          "questionDetails": {
            "recommendedLength": 100,
            "questionText": "New format Text question",
            "questionType": "TEXT"
          },
          "description": "Feedback question with no responses",
          "questionNumber": 5,
          "giverType": "SELF",
          "recipientType": "NONE",
          "numOfEntitiesToGiveFeedbackTo": -100,
          "showResponsesTo": ["INSTRUCTORS"],
          "showGiverNameTo": ["INSTRUCTORS"],
          "showRecipientNameTo": ["INSTRUCTORS"]
        },
        "qn1InSession2InCourse1": {
          "id": "00000000-0000-4000-8001-000000000800",
          "feedbackSession": {
            "id": "00000000-0000-4000-8000-000000000702"
          },
          "questionDetails": {
            "hasAssignedWeights": false,
            "mcqWeights": [],
            "mcqOtherWeight": 0.0,
            "mcqChoices": ["Great", "Perfect"],
            "otherEnabled": false,
            "questionDropdownEnabled": false,
            "generateOptionsFor": "NONE",
            "questionType": "MCQ",
            "questionText": "How do you think you did?"
          },
          "description": "This is a mcq question.",
          "questionNumber": 1,
          "giverType": "STUDENTS",
          "recipientType": "SELF",
          "numOfEntitiesToGiveFeedbackTo": 1,
          "showResponsesTo": ["INSTRUCTORS"],
          "showGiverNameTo": ["INSTRUCTORS"],
          "showRecipientNameTo": ["INSTRUCTORS"]
        }
      },
      "feedbackResponses": {
        "response1ForQ1": {
          "id": "00000000-0000-4000-8000-000000000901",
          "feedbackQuestion": {
            "id": "00000000-0000-4000-8000-000000000801",
            "questionDetails": {
              "questionType": "TEXT",
              "questionText": "What is the best selling point of your product?"
            }
          },
          "giver": "student1@teammates.tmt",
          "recipient": "student1@teammates.tmt",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "answer": {
            "questionType": "TEXT",
            "answer": "Student 1 self feedback."
          }
        },
        "response2ForQ1": {
          "id": "00000000-0000-4000-8000-000000000902",
          "feedbackQuestion": {
            "id": "00000000-0000-4000-8000-000000000801",
            "questionDetails": {
              "questionType": "TEXT",
              "questionText": "What is the best selling point of your product?"
            }
          },
          "giver": "student2@teammates.tmt",
          "recipient": "student2@teammates.tmt",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "answer": {
            "questionType": "TEXT",
            "answer": "Student 2 self feedback."
          }
        },
        "response1ForQ2": {
          "id": "00000000-0000-4000-8000-000000000903",
          "feedbackQuestion": {
            "id": "00000000-0000-4000-8000-000000000802",
            "feedbackSession": {
              "id": "00000000-0000-4000-8000-000000000701"
            },
            "questionDetails": {
              "recommendedLength": 0,
              "questionType": "TEXT",
              "questionText": "Rate 1 other student's product"
            },
            "description": "This is a text question.",
            "questionNumber": 2,
            "giverType": "STUDENTS",
            "recipientType": "STUDENTS_EXCLUDING_SELF",
            "numOfEntitiesToGiveFeedbackTo": 1,
            "showResponsesTo": ["INSTRUCTORS", "RECEIVER"],
            "showGiverNameTo": ["INSTRUCTORS"],
            "showRecipientNameTo": ["INSTRUCTORS", "RECEIVER"]
          },
          "giver": "student2@teammates.tmt",
          "recipient": "student1@teammates.tmt",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "answer": {
            "questionType": "TEXT",
            "answer": "Student 2's rating of Student 1's project."
          }
        },
        "response2ForQ2": {
          "id": "00000000-0000-4000-8000-000000000904",
          "feedbackQuestion": {
            "id": "00000000-0000-4000-8000-000000000802",
            "feedbackSession": {
              "id": "00000000-0000-4000-8000-000000000701"
            },
            "questionDetails": {
              "recommendedLength": 0,
              "questionType": "TEXT",
              "questionText": "Rate 1 other student's product"
            },
            "description": "This is a text question.",
            "questionNumber": 2,
            "giverType": "STUDENTS",
            "recipientType": "STUDENTS_EXCLUDING_SELF",
            "numOfEntitiesToGiveFeedbackTo": 1,
            "showResponsesTo": ["INSTRUCTORS", "RECEIVER"],
            "showGiverNameTo": ["INSTRUCTORS"],
            "showRecipientNameTo": ["INSTRUCTORS", "RECEIVER"]
          },
          "giver": "student3@teammates.tmt",
          "recipient": "student2@teammates.tmt",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "answer": {
            "questionType": "TEXT",
            "answer": "Student 3's rating of Student 2's project."
          }
        },
        "response1ForQ3": {
          "id": "00000000-0000-4000-8000-000000000905",
          "feedbackQuestion": {
            "id": "00000000-0000-4000-8000-000000000803",
            "questionDetails": {
              "questionType": "TEXT",
              "questionText": "My comments on the class"
            }
          },
          "giver": "student1@teammates.tmt",
          "recipient": "student1@teammates.tmt",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "answer": {
            "questionType": "TEXT",
            "answer": "The class is great."
          }
        },
        "response1ForQ1InSession2": {
          "id": "00000000-0000-4000-8001-000000000901",
          "feedbackQuestion": {
            "id": "00000000-0000-4000-8001-000000000800",
            "questionDetails": {
              "hasAssignedWeights": false,
              "mcqWeights": [],
              "mcqOtherWeight": 0.0,
              "mcqChoices": ["Great", "Perfect"],
              "otherEnabled": false,
              "questionDropdownEnabled": false,
              "generateOptionsFor": "NONE",
              "questionType": "MCQ",
              "questionText": "How do you think you did?"
            }
          },
          "giver": "student1@teammates.tmt",
          "recipient": "student1@teammates.tmt",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "answer": {
            "answer": "Great",
            "otherFieldContent": "",
            "questionType": "MCQ"
          }
        }
      },
      "feedbackResponseComments": {
        "comment1ToResponse1ForQ1": {
          "id": "",
          "feedbackResponse": {
            "id": "00000000-0000-4000-8000-000000000901",
            "answer": {
              "questionType": "TEXT",
              "answer": "Student 1 self feedback."
            }
          },
          "giver": "instr1@teammates.tmt",
          "giverType": "INSTRUCTORS",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "commentText": "Instructor 1 comment to student 1 self feedback",
          "isVisibilityFollowingFeedbackQuestion": false,
          "isCommentFromFeedbackParticipant": false,
          "showCommentTo": [],
          "showGiverNameTo": [],
          "lastEditorEmail": "instr1@teammates.tmt"
        },
        "comment2ToResponse1ForQ1": {
          "id": "",
          "feedbackResponse": {
            "id": "00000000-0000-4000-8000-000000000901",
            "answer": {
              "questionType": "TEXT",
              "answer": "Student 1 self feedback."
            }
          },
          "giver": "student1@teammates.tmt",
          "giverType": "STUDENTS",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "commentText": "Student 1 comment to student 1 self feedback",
          "isVisibilityFollowingFeedbackQuestion": false,
          "isCommentFromFeedbackParticipant": false,
          "showCommentTo": [],
          "showGiverNameTo": [],
          "lastEditorEmail": "student1@teammates.tmt"
        },
        "comment2ToResponse2ForQ1": {
          "id": "",
          "feedbackResponse": {
            "id": "00000000-0000-4000-8000-000000000902",
            "answer": {
              "questionType": "TEXT",
              "answer": "Student 2 self feedback."
            }
          },
          "giver": "instr2@teammates.tmt",
          "giverType": "INSTRUCTORS",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "commentText": "Instructor 2 comment to student 2 self feedback",
          "isVisibilityFollowingFeedbackQuestion": false,
          "isCommentFromFeedbackParticipant": false,
          "showCommentTo": [],
          "showGiverNameTo": [],
          "lastEditorEmail": "instr2@teammates.tmt"
        },
        "comment1ToResponse1ForQ2s": {
          "id": "",
          "feedbackResponse": {
            "id": "00000000-0000-4000-8000-000000000903",
            "answer": {
              "questionType": "TEXT",
              "answer": "Student 2 self feedback."
            }
          },
          "giver": "instr2@teammates.tmt",
          "giverType": "INSTRUCTORS",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "commentText": "Instructor 2 comment to student 2 self feedback",
          "isVisibilityFollowingFeedbackQuestion": false,
          "isCommentFromFeedbackParticipant": false,
          "showCommentTo": [],
          "showGiverNameTo": [],
          "lastEditorEmail": "instr2@teammates.tmt"
        },
        "comment1ToResponse1ForQ3": {
          "id": "",
          "feedbackResponse": {
            "id": "00000000-0000-4000-8000-000000000905",
            "answer": {
              "questionType": "TEXT",
              "answer": "The class is great."
            }
          },
          "giver": "instr1@teammates.tmt",
          "giverType": "INSTRUCTORS",
          "giverSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "recipientSection": {
            "id": "00000000-0000-4000-8000-000000000201"
          },
          "commentText": "Instructor 1 comment to student 1 self feedback",
          "isVisibilityFollowingFeedbackQuestion": false,
          "isCommentFromFeedbackParticipant": false,
          "showCommentTo": [],
          "showGiverNameTo": [],
          "lastEditorEmail": "instr1@teammates.tmt"
        }
      },
    };

    const courses: Node[] = this.generateNodes(data.courses, 'blue', [], 11);
    const sessions: Node[] = this.generateNodes(data.feedbackSessions, 'green', ['course'], 10);
    const questions: Node[] = this.generateNodes(data.feedbackQuestions, 'black', ['feedbackSession'], 9);
    const responses: Node[] = this.generateNodes(data.feedbackResponses, 'yellow', ['feedbackQuestion'], 9);
    const comments: Node[] = this.generateNodes(data.feedbackResponseComments, 'grey', ['feedbackResponse', 'giverSection', 'recipientSection'], 9);
    const sections: Node[] = this.generateNodes(data.sections, 'red', ['course'], 9);

    this.nodes = [...courses, ...sessions, ...questions, ...responses, ...comments, ...sections];
    const idToNodeMap: { [id: string]: Node } = {};
    this.nodes.forEach(node => {
      idToNodeMap[node.id] = node;
    });

    const sessionToQuestionLinks = this.generateLinks(sessions, idToNodeMap);
    const questionsToSessionLinks = this.generateLinks(questions, idToNodeMap);
    const responseToQuestionLinks = this.generateLinks(responses, idToNodeMap);
    const commentsToResponseLinks = this.generateLinks(comments, idToNodeMap);
    const sectionsToCourseLinks = this.generateLinks(sections, idToNodeMap);
    this.links = [...sessionToQuestionLinks, ...questionsToSessionLinks, ...responseToQuestionLinks, ...commentsToResponseLinks, ...sectionsToCourseLinks];
  }

  ngOnChanges(): void {
      
  }

  generateNodes<T extends DataBundleEntity>(
    entities: { [key: string]: T },
    color: string,
    relationIdKeys: (keyof T)[],
    size?: number
  ): Node[] {
    return Object.keys(entities).map((entityKey) => {
      const entity = entities[entityKey];
      const relationIds = [];

      for (const relationIdKey of relationIdKeys) {
        if (entity[relationIdKey].id) {
          relationIds.push(entity[relationIdKey].id);
        }
      }

      return {
        id: entity.id ?? "",
        name: entityKey,
        data: { ...entity },
        color,
        size: size || 11,
        relationIds: relationIds
      }
    }
    );
  }

  generateLinks(sources: Node[], idToNodeMap: { [id: string]: Node }) {
    const links: Link[] = [];

    sources.forEach(source => {
      const targetIds = source.relationIds;
      if (!targetIds) {
        return;
      }
      for (const targetId of targetIds) {
        const targetNode = idToNodeMap[targetId];
        if (targetNode) {
          links.push({
            source: source,
            target: targetNode,
          });
        }
      }
    });
  
    return links;
  }

  openModal(nodeData: Node) {
    this.simpleModalService.openInformationModal(nodeData.name, SimpleModalType.INFO, this.formatObject(nodeData.data));
  }

  formatObject(obj: any, indent: number = 0): string {
    const indentString = ' '.repeat(indent * 2);
    const keys = Object.keys(obj);

    return keys.map(key => {
      const value = obj[key];
      const formattedValue = typeof value === 'object'
        ? this.formatObject(value, indent + 1)
        : JSON.stringify(value);

      return `${indentString}<strong>${key}</strong>: ${formattedValue}`;
    }).join(',<br>');
  }

  linkVisibility: { [key: string]: boolean } = {
    sessionToQuestion: true,
    questionToSession: true,
    responseToQuestion: true,
    commentsToResponse: true,
    sectionsToCourse: true
  };

  toggleLinkVisibility(linkType: string) {
    this.linkVisibility[linkType] = !this.linkVisibility[linkType];
  }
}
