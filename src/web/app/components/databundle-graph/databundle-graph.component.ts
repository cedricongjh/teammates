import { Component, Input, OnInit } from '@angular/core';
import { Link, Node } from '../../components/force-directed-graph/force-directed-graph.model';
import { SimpleModalService } from '../../../services/simple-modal.service';
import { SimpleModalType } from '../simple-modal/simple-modal-type';
import { DEFAULT_LINK_VISIBLITY, DEFAULT_LABEL_VISBILITY, DataBundle, DataBundleEntity, EMPTY_DATA_BUNDLE, LabelVisbilityModel, LinkVisibilityModel } from './databundle-graph.model';

@Component({
  selector: 'tm-databundle-graph',
  templateUrl: './databundle-graph.component.html',
  styleUrls: ['./databundle-graph.component.scss']
})
export class DatabundleGraphComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];
  @Input() dataBundle: DataBundle = EMPTY_DATA_BUNDLE;
  labelVisbilityModel: LabelVisbilityModel = DEFAULT_LABEL_VISBILITY;
  linkVisibilityModel: LinkVisibilityModel = DEFAULT_LINK_VISIBLITY;

  constructor(private simpleModalService: SimpleModalService) {}

  ngOnInit(): void {
    this.generateNodesAndLinks();
  }

  generateNodesAndLinks() {
    const data: DataBundle = this.dataBundle;

    const courses: Node[] = this.generateNodes(data.courses, 'course', 'blue', [], 11);
    const sessions: Node[] = this.generateNodes(data.feedbackSessions, 'feedbackSession', 'green', ['course'], 10);
    const questions: Node[] = this.generateNodes(data.feedbackQuestions, 'feedbackQuestion', 'black', ['feedbackSession'], 9);
    const responses: Node[] = this.generateNodes(data.feedbackResponses, 'feedbackResponse', 'yellow', ['feedbackQuestion'], 9);
    const comments: Node[] = this.generateNodes(data.feedbackResponseComments, 'feedbackResponseComment', 'grey', ['feedbackResponse', 'giverSection', 'recipientSection'], 9);
    const sections: Node[] = this.generateNodes(data.sections, 'section', 'red', ['course'], 9);

    this.nodes = [...courses, ...sessions, ...questions, ...responses, ...comments, ...sections];
    const idToNodeMap: { [id: string]: Node } = {};
    this.nodes.forEach(node => {
      idToNodeMap[node.id] = node;
    });

    const sessionLinks = this.generateLinks(sessions, idToNodeMap);
    const questionsLinks = this.generateLinks(questions, idToNodeMap);
    const responseLinks = this.generateLinks(responses, idToNodeMap);
    const commentsLinks = this.generateLinks(comments, idToNodeMap);
    const sectionsLinks = this.generateLinks(sections, idToNodeMap);
    this.links = [...sessionLinks, ...questionsLinks, ...responseLinks, ...commentsLinks, ...sectionsLinks];
    console.log(this.links);
  }

  generateNodes<T extends DataBundleEntity>(
    entities: { [key: string]: T },
    type: string,
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
        label: entityKey,
        data: { type, ...entity },
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
        if (!targetNode) {
          return;
        }

        const sourceType = source.data['type'];
        if (!sourceType) {
          return;
        }

        const targetType = targetNode.data['type'];
        if (!targetType) {
          return;
        }

        const visibilityKey = `${sourceType}To${targetType}` as keyof LinkVisibilityModel;;
        if (!this.linkVisibilityModel[visibilityKey]) {
          return;
        }

        links.push({
          source: source,
          target: targetNode,
        });
      }
    });
  
    return links;
  }

  openModal(nodeData: Node) {
    this.simpleModalService.openInformationModal(nodeData.label, SimpleModalType.INFO, this.formatObject(nodeData.data));
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

  triggerModelChange(field: string, data: any): void {
    this.linkVisibilityModel = {
      ...this.linkVisibilityModel,
      [field]: data,
    };
    this.generateNodesAndLinks();
  }
}
