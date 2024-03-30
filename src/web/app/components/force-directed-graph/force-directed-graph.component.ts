import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { forceCenter, forceLink, forceManyBody, forceSimulation, select, Selection, Simulation } from 'd3';
import { Node, Link } from './force-directed-graph.model';

@Component({
  selector: 'tm-force-directed-graph',
  templateUrl: './force-directed-graph.component.html',
})
export class ForceDirectedGraphComponent implements OnInit {
  @Input() nodes: Node[] = [];
  @Input() links: Link[] = [];

  private hostElement;
  private simulation: Simulation<Node, Link> = this.createSimulation(this.nodes, this.links);
  private svg: Selection<any, unknown, null, undefined>;
  private graphLinks: Selection<SVGLineElement, Link, SVGSVGElement, unknown>;
  private graphNodes: Selection<SVGGElement, Node, SVGSVGElement, unknown>;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
    this.svg = this.createSvgContainer();
    this.graphNodes = this.svg.selectAll('.node');
    this.graphLinks = this.svg.selectAll('line');
  }

  ngOnInit() {
    this.simulation = this.createSimulation(this.nodes, this.links);
    this.setUpLinks();
    this.setUpNodes();
    this.setUpSimulationUpdates();
  }

  private createSvgContainer() {
    return select(this.hostElement).append('svg')
      .attr('width', "100vw")
      .attr('height', "100vh");
  }

  private createSimulation(nodes: Node[], links: Link[]) {
    return forceSimulation(nodes)
      .force('link', forceLink(links).id((d: any) => d.id))
      .force('charge', forceManyBody().strength(-100))
      .force('center', forceCenter(400, 300));
  }

  private setUpLinks() {
    this.graphLinks = this.svg.selectAll('line')
      .data(this.links)
      .enter().append('line')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6)
      .attr('stroke-width', 2);
  }

  private setUpNodes() {
    this.graphNodes = this.svg.selectAll('.node')
      .data(this.nodes)
      .enter().append('g')
      .attr('class', 'node')

      this.graphNodes.append('circle')
      .attr('r', 8)
      .style('fill', 'red');

      this.graphNodes.append('text')
        .attr('x', 12)
        .attr('dy', '.5em')
        .text(d => d.id);

      this.graphNodes.on("click", function() {
        let text = select(this).select("text");
        if (text.style("visibility") === "hidden") {
          text.style("visibility", "visible");
        } else {
          text.style("visibility", "hidden");
        }
    });
  }

  private setUpSimulationUpdates() {
    this.simulation.on('tick', () => {
      this.graphLinks.attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);
      this.graphNodes.attr('transform', d => `translate(${(d as any).x},${(d as any).y})`);
    });
  }
}