import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Node, Link } from './force-directed-graph.model';

@Component({
  selector: 'tm-force-directed-graph',
  templateUrl: './force-directed-graph.component.html',
})
export class ForceDirectedGraphComponent implements OnInit, OnChanges  {
  @Input() nodes: Node[] = [];
  @Input() links: Link[] = [];

  ngOnChanges(): void {}

  ngOnInit() {}

}