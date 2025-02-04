import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { EmployeeChartsComponent } from './employee-charts.component';

describe('EmployeeChartsComponent', () => {
  let component: EmployeeChartsComponent;
  let fixture: ComponentFixture<EmployeeChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeChartsComponent]
    });

    fixture = TestBed.createComponent(EmployeeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
