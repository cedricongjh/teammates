import { Component, OnChanges, OnInit } from '@angular/core';
import { Link, Node } from '../../components/force-directed-graph/force-directed-graph.model';

@Component({
  selector: 'tm-databundle-page',
  templateUrl: './databundle-page.component.html',
  styleUrls: ['./databundle-page.component.scss']
})
export class DatabundlePageComponent implements OnInit, OnChanges {

  nodes: Node[] = [];
  links: Link[] = [];

  ngOnInit(): void {
    const data: {
    courses: { [key: string]: { name: string } };
    feedbackSessions: { [key: string]: { name: string, courseId: string } };
  } = {
      "courses": {
        "CS2104": {
          "name": "Programming Language Concepts"
        },
        "CS1101": {
          "name": "Programming Methodology"
        },
        "CS4215": {
          "name": "Programming Language Implementation"
        },
        "CS4221": {
          "name": "Database Design"
        }
      },
      "feedbackSessions": {
        "CS2104Feedback": {
          "name": "Feedback Session for Programming Language Concepts",
          "courseId": "CS2104"
        },
        "CS2104Feedback2": {
          "name": "Feedback Session for Programming Language Concepts 2",
          "courseId": "CS2104"
        },
        "CS1101Feedback": {
          "name": "Feedback Session for Programming Methodology",
          "courseId": "CS1101"
        },
        "CS4215Feedback": {
          "name": "Feedback Session for Programming Language Implementation",
          "courseId": "CS4215"
        },
        "CS4221Feedback": {
          "name": "Feedback Session for Database Design",
          "courseId": "CS4221"
        }
      }
    };

    // Extract nodes and links from the JSON data
    const nodes: Node[] = Object.keys(data.courses).map((courseId, index) => ({
      id: courseId,
      name: data.courses[courseId].name,
      type: 'course',
      index: index,
    }));

    const sessions: Node[] = Object.keys(data.feedbackSessions).map((sessionId, index) => ({
      id: sessionId,
      name: data.feedbackSessions[sessionId].name,
      relationId: data.feedbackSessions[sessionId].courseId,
      type: 'session',
      index: index,
    }));

    this.nodes = [...nodes, ...sessions];

    this.links = sessions.map(session => ({
      source: session,
      target: nodes.find(course => course.id === session.relationId)!
    }));

  }

  ngOnChanges(): void {
      
  }
}
