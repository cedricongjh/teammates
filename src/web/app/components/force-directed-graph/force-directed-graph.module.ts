import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForceDirectedGraphComponent } from './force-directed-graph.component';

/**
 * Force directed graph module.
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ForceDirectedGraphComponent],
  declarations: [ForceDirectedGraphComponent],
})
export class ForceDirectedGraphModule { }
