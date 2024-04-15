import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { D3DragEvent, drag, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, select, Selection, Simulation, zoom } from 'd3';
import { Node, Link } from './force-directed-graph.model';

@Component({
  selector: 'tm-force-directed-graph',
  templateUrl: './force-directed-graph.component.html',
})
export class ForceDirectedGraphComponent implements OnInit {
  @Input() nodes: Node[] = [];
  @Input() links: Link[] = [];
  @Output() onClick: EventEmitter<Node> = new EventEmitter();

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
    this.setUpZoom();
    this.setUpLinks();
    this.setUpNodes();
    this.setUpSimulationUpdates();
  }

  private createSvgContainer() {
    return select(this.hostElement).append('svg')
      .attr('width', 1000)
      .attr('height', 1000)
      .attr('viewBox', [-1000/2, -1000/2, 1000, 1000])
      .call(zoom<SVGSVGElement, any>().on("zoom", (event: any) => {
        this.svg.attr("transform", event.transform)
        }))
      .append('g');
  }

  private createSimulation(nodes: Node[], links: Link[]) {
    return forceSimulation(nodes)
      .force('link', forceLink(links).id((d: any) => d.id))
      .force('charge', forceManyBody().strength(-500))
      .force("x", forceX())
      .force("y", forceY())
      .force('collision', forceCollide().radius(50).strength(0.8));
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
      .enter()
      .append('g')
      .attr('class', 'node');

    this.graphNodes.append('circle')
      .attr('r', d => d.size ?? 8)
      .style('fill', d => d.color ?? 'red');

    this.graphNodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('y', -10)
      .text(d => d.label)
      .style('fill', 'black')

    this.graphNodes.call(drag<SVGGElement, Node>().on("start", this.dragstarted)
      .on("drag", this.dragged)
      .on("end", this.dragended));

    this.graphNodes.on("click", (_: any, node: Node) => {
      this.onClick.emit(node);
    })
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

  private setUpZoom = () => {
    const handleZoom = (e: any) => {
      this.svg.attr('transform', e.transform)
    }

    let zoomHandler = zoom()
      .on('zoom', handleZoom);
  
    this.svg.call(zoomHandler);
  }

  private dragstarted = (
    event: D3DragEvent<SVGCircleElement, Node, Node>
  ) => {
    event.sourceEvent.stopPropagation();
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  private dragged = (
    event: D3DragEvent<SVGCircleElement, Node, Node>
  ) => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  private dragended = (
    event: D3DragEvent<SVGCircleElement, Node, Node>
  ) => {
    if (!event.active) this.simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
}