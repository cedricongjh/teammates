import { Component, Input, OnInit } from '@angular/core';
import { Link, Node } from '../../components/force-directed-graph/force-directed-graph.model';
import { SimpleModalService } from '../../../services/simple-modal.service';
import { SimpleModalType } from '../simple-modal/simple-modal-type';
import { DataBundle, DataBundleEntity, EMPTY_DATA_BUNDLE } from './databundle-graph.model';

@Component({
  selector: 'tm-databundle-graph',
  templateUrl: './databundle-graph.component.html',
  styleUrls: ['./databundle-graph.component.scss']
})
export class DatabundleGraphComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  @Input() dataBundle: DataBundle = EMPTY_DATA_BUNDLE;

  constructor(private simpleModalService: SimpleModalService) {}

  ngOnInit(): void {
    this.generateNodesAndLinks();
  }

  generateNodesAndLinks() {
    const data: DataBundle = this.dataBundle;

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
}
