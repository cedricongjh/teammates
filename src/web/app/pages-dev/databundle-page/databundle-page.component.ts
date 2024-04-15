import { Component } from '@angular/core';
import * as databundle from 'src/it/resources/data/typicalDataBundle.json';
import { DataBundle } from '../../components/databundle-graph/databundle-graph.model';

@Component({
  selector: 'tm-databundle-page',
  templateUrl: './databundle-page.component.html',
  styleUrls: ['./databundle-page.component.scss']
})
export class DatabundlePageComponent {

  dataBundle: DataBundle = databundle;

  constructor() {}

}
