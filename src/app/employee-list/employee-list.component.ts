import { CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../auth.service';
import {
  EmployeeModalFormComponent,
} from '../employee-modal-form/employee-modal-form.component';
import { EmployeeListService } from './employee-list.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, EmployeeModalFormComponent, TranslatePipe, NgxPaginationModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: any[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  error: string | null = null;
  resultsFound: boolean = false;
  inputTouched: boolean = false;
  
  isLoading: boolean = false;
  employeeDataForEdit: any = null;
  currentPage = 1;
  itemsPerPage = 10;
 
  @Input() employeeData: any = null;
  @Output() employeeAdded = new EventEmitter<any>();
  selectedEmployee: any = null;


  constructor(private employeeListService: EmployeeListService, private authService: AuthService, private router: Router) {}


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {

    this.isLoading = true;
    
    this.getEmployeeList();
    this.isLoading = false;
  }
  

    getEmployeeList(): void {
      this.loading = true;
      this.employeeListService.getEmployeeList().subscribe(
        (list) => {
          this.employees = list;
          this.loading = false;
        },
        (error) => {
          this.error = 'Could not fetch employee data. Try again later.';
          this.loading = false;
        }
      )
    }

    
    onEmployeeAdded(employeeData: any): void {
     
      this.employees = this.employeeListService.addEmployee(employeeData, this.employees);

      this.selectedEmployee = null;
    
    }

    onSearchEmployees(): void {
      this.inputTouched = true;
      const query = this.searchQuery.toLowerCase();
    
      if (!query) {
        this.getEmployeeList(); 
        
        return;
        
      } else{
        this.employees = this.employees.filter((employee) => {
       
          return (
            employee.firstName.toLowerCase().includes(query) ||
            employee.lastName.toLowerCase().includes(query) ||
            employee.email.toLowerCase().includes(query) ||
            employee.address.toLowerCase().includes(query)
          );
        });
      }
      if (this.employees.length === 0) {
        this.resultsFound = false;
      } else {
        this.resultsFound = true;
      }
     
    }
    
    
    sortAge(event: any): void {
      const value = event.target.value;

      if (value === '1') {
          this.employees.sort((a, b) => a.age - b.age);
      } else if (value === '2') {
         this.employees.sort((a, b) => b.age - a.age);
    } 
  }

  editEmployee(employee: any): void {
    this.selectedEmployee = {...employee};
  }

  updateEmployee(updatedEmployee: any): void {
    if (updatedEmployee && updatedEmployee.id) {
      const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
  
      if (index !== -1) {
        this.employees = [
          ...this.employees.slice(0, index), 
          updatedEmployee, 
          ...this.employees.slice(index + 1)
        ]; 
      } else {
        console.error("Employee not found in list.");
      }
  
     
      setTimeout(() => {
        this.selectedEmployee = null; 
      }, 2000);
    }
  }

  
  deleteEmployee(employee: number): void {
    const confirmDelete = confirm(`You sure you want to delete?`);
    if (confirmDelete) {
    this.employees = this.employees.filter((e) => e.id!== employee);
    alert('Employee deleted!')
    }
    
  }



  }




