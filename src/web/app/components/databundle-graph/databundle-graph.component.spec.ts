import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabundleGraphComponent } from './databundle-graph.component';

describe('DatabundleGraphComponent', () => {
  let component: DatabundleGraphComponent;
  let fixture: ComponentFixture<DatabundleGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabundleGraphComponent]
    });
    fixture = TestBed.createComponent(DatabundleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
