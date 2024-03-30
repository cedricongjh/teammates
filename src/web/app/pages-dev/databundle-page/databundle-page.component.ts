import { Component, OnChanges, OnInit } from '@angular/core';
import { Link, Node } from '../../components/force-directed-graph/force-directed-graph.model';

interface DataBundleEntity {
  id: string;
  [key: string]: any;
}

interface FeedbackSessionDataBundleEntity extends DataBundleEntity {
  course: DataBundleEntity;
}

interface FeedbackQuestionDataBundleEntity extends DataBundleEntity {
  feedbackSession: DataBundleEntity;
}

interface DataBundle {
  courses: { [key: string]: DataBundleEntity }
  feedbackSessions: { [key: string]: FeedbackSessionDataBundleEntity }
  feedbackQuestions: { [key: string]: FeedbackQuestionDataBundleEntity }
}

@Component({
  selector: 'tm-databundle-page',
  templateUrl: './databundle-page.component.html',
  styleUrls: ['./databundle-page.component.scss']
})
export class DatabundlePageComponent implements OnInit, OnChanges {

  nodes: Node[] = [];
  links: Link[] = [];

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
    };

    const courses: Node[] = this.generateNodes(data.courses, 'blue', 'institute', 11);
    const sessions: Node[] = this.generateNodes(data.feedbackSessions, 'green', 'course', 10);
    const questions: Node[] = this.generateNodes(data.feedbackQuestions, 'black', 'feedbackSession', 9);

    this.nodes = [...courses, ...sessions, ...questions];

    const sessionToQuestionLinks = this.generateLinks(sessions, courses);
    const questionsToSessionLinks = this.generateLinks(questions, sessions);
    this.links = [...sessionToQuestionLinks, ...questionsToSessionLinks];
  }

  ngOnChanges(): void {
      
  }

  generateNodes<T extends DataBundleEntity>(
    entities: { [key: string]: T },
    color: string,
    relationIdKey: keyof T,
    size?: number
  ): Node[] {
    return Object.keys(entities).map((entityKey) => ({
      id: entities[entityKey].id,
      name: entityKey,
      color,
      size: size || 11,
      relationId: entities[entityKey][relationIdKey].id
    }));
  }

  generateLinks(sources: Node[], targets: Node[]) {
    return sources.map(source => ({
      source: source,
      target: targets.find(target => target.id === source.relationId)!
    }));
  }
}
