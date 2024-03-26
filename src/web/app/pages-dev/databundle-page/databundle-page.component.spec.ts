import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabundlePageComponent } from './databundle-page.component';

describe('DatabundlePageComponent', () => {
  let component: DatabundlePageComponent;
  let fixture: ComponentFixture<DatabundlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabundlePageComponent]
    });
    fixture = TestBed.createComponent(DatabundlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
