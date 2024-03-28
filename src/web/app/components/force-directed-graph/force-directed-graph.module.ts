import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForceDirectedGraphComponent } from './force-directed-graph.component';

/**
 * Error report module.
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ForceDirectedGraphComponent],
  declarations: [ForceDirectedGraphComponent],
})
export class ForceDirectedGraphModule { }
