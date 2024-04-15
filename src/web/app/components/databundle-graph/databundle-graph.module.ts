import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceDirectedGraphModule } from '../../components/force-directed-graph/force-directed-graph.module';
import { DatabundleGraphComponent } from './databundle-graph.component';

@NgModule({
  declarations: [
    DatabundleGraphComponent
  ],
  exports: [
    DatabundleGraphComponent
  ],
  imports: [
    CommonModule,
    ForceDirectedGraphModule
  ]
})
export class DatabundleGraphModule { }
