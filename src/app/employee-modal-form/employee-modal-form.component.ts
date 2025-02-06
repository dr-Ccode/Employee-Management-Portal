import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';

import { EmployeeListService } from '../employee-list/employee-list.service';
import { ProfessionService } from '../services/profession.service';

@Component({
  selector: 'app-employee-modal-form',
  
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './employee-modal-form.component.html',
  styleUrl: './employee-modal-form.component.css'
})
export class EmployeeModalFormComponent implements OnInit {

  @Output() employeeAdded = new EventEmitter<any>();
  @Input() employeeData: any = null;
  @Output() employeeUpdated = new EventEmitter<any>();

  isSubmitted: boolean = false;
  
  professions: any[] = [];
  isEmployeeAddedSuccess: boolean = false; 
  isEmployeeUpdatedSuccess: boolean = false;

  employeeList: any[] = [];

  notificationsEnabled?: boolean;

  constructor(private professionService: ProfessionService, private employeeListService: EmployeeListService) {}

  ngOnInit(): void {
    this.loadProfessions();

    this.notificationsEnabled = JSON.parse(localStorage.getItem('notifications') || 'true');
    console.log(this.notificationsEnabled);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges triggered:", changes);

    if (changes['employeeData'] && this.employeeData) {
      console.log("Editing employee:", this.employeeData);
      this.addEmployeeForm.patchValue(this.employeeData);
      
    }
    
  }
  

  addEmployeeForm: FormGroup = new FormGroup({
 
    firstName: new FormControl('', {
      validators: [Validators.required]}),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    profession: new FormControl('', {
      validators: [Validators.required]
    }),
    address: new FormControl('', {
      validators: [Validators.required]
    }),
    showAdditionalFields: new FormControl(false),
    age: new FormControl(0),
    contactNumber: new FormControl(''),
  });

  
  onSubmit(): void {
    this.isSubmitted = true;
  
    if (this.addEmployeeForm.valid) {
      const formData = { ...this.addEmployeeForm.value };
  
      
      const newEmployee = { ...this.addEmployeeForm.value };
      newEmployee.age = Math.floor(Math.random() * 101); 
      newEmployee.salary = Math.floor(Math.random() * 100); 
  
      this.employeeListService.getEmployeeList().subscribe({
        next: (data) => {
         
          newEmployee.id = Math.floor(Math.random() * 9999);
  
       
          this.employeeAdded.emit(newEmployee);
          this.isEmployeeAddedSuccess = true;
          this.isEmployeeUpdatedSuccess = true;
  
         
          this.addEmployeeForm.reset();
          this.addEmployeeForm.patchValue({ showAdditionalFields: false, age: 0 });
  
          
          // setTimeout(() => {
          //   this.isEmployeeAddedSuccess = false;
          // }, 1800);
          
          
          this.isSubmitted = false;
        },
        error: (err) => {
          console.error('Error fetching employee list:', err);
        },
      });
    } else {
      console.error('Invalid form values');
    }
  }
  
  onUpdate(): void {
    this.isSubmitted = true;
  
    if (this.employeeData && this.addEmployeeForm.valid) {
      const updatedEmployee = {
        ...this.employeeData,
        ...this.addEmployeeForm.value,
        id: this.employeeData.id,
      };
  
      console.log('Updating employee:', updatedEmployee);
      this.employeeUpdated.emit(updatedEmployee); 
     
      this.isEmployeeUpdatedSuccess = true;
      //this.employeeAddedSuccess = true;
      // Hide success message after 2 seconds
      // setTimeout(() => {
      //   this.isEmployeeUpdatedSuccess = false;
      // }, 2000);
  
      this.isSubmitted = false;
    } else {
      console.error('Invalid form values');
    }
  }
 
    onClose(){
      
       this.addEmployeeForm.patchValue({ showAdditionalFields: false, age: 0 });
       this.isSubmitted = false;
      this.employeeData = null;
      this.addEmployeeForm.reset();
       this.isEmployeeAddedSuccess = false;
       this.isEmployeeUpdatedSuccess = false;
    }
    

  loadProfessions(): void {
    this.professionService.getProfessions().subscribe({
      next: (data) => {
        this.professions = data; 
      },
      error: (err) => {
        console.error('Error fetching professions:', err);
      },
    });
  }


 
} 