import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalFormComponent } from './employee-modal-form.component';

describe('EmployeeModalFormComponent', () => {
  let component: EmployeeModalFormComponent;
  let fixture: ComponentFixture<EmployeeModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
