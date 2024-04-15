import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

export interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  data: { [key: string]: any };
  relationIds?: string[];
  size?: number;
  color?: string;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
}

export interface ForceDirectedGraph {
  nodes: Node[];
  links: Link[];
}


