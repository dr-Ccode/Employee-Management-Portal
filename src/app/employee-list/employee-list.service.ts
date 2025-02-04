import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  private userListUrl = 'https://hub.dummyapis.com/employee?noofRecords=50&idStarts=1001';

 
  private employeeListSubject = new BehaviorSubject<any[]>([]);
  employeeList$ = this.employeeListSubject.asObservable();

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<any[]> {
    
    return this.http.get<any[]>(this.userListUrl);
  }

  addEmployee(newEmployee: any, currentList: any[]): any[] {
   return [...currentList, newEmployee];

  }

  updateEmployee(updatedEmployee: any): void {
    const currentEmployees = this.employeeListSubject.getValue(); // Get current list
    const updatedEmployees = currentEmployees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
  
    this.employeeListSubject.next(updatedEmployees); // Emit updated list
  }
}
