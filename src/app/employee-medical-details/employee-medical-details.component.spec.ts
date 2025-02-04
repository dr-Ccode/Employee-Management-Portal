import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMedicalDetailsComponent } from './employee-medical-details.component';

describe('EmployeeMedicalDetailsComponent', () => {
  let component: EmployeeMedicalDetailsComponent;
  let fixture: ComponentFixture<EmployeeMedicalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeMedicalDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMedicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
