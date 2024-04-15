import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabundleGraphModule } from '../../components/databundle-graph/databundle-graph.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatabundleGraphModule,
  ]
})
export class DatabundlePageModule { }
