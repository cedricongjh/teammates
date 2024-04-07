import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceDirectedGraphModule } from '../../components/force-directed-graph/force-directed-graph.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForceDirectedGraphModule,
  ]
})
export class DatabundlePageModule { }
