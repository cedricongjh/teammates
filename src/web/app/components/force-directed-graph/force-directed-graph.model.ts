import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

export interface Node extends SimulationNodeDatum {
  id: string;
  relationId?: string;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
}

export interface ForceDirectedGraph {
  nodes: Node[];
  links: Link[];
}


