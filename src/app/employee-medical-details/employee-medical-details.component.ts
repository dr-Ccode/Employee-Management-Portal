import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

@Component({
  selector: 'app-employee-medical-details',
  imports: [CurrencyPipe, FormsModule, TranslatePipe],
  templateUrl: './employee-medical-details.component.html',
  styleUrls: ['./employee-medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalDetails: any[] = []; 
  error: string | null = null;
  isEditMode: boolean = false;
  totalDependents: number = 0; 
  isSuccessfullyAddedUpdated: boolean = false;
  loading: boolean = false;

  notificationsEnabled?: boolean;
  
  medicalForm = {
    id: null,
    policyName: '',
    salary: 0,
    claimedAmount: 0,
    numberOfDependents: 0,
  };
  
  constructor(private http: HttpClient, private translateService: TranslateService) {}

  editForm(employee: any): void {
    this.isEditMode = true;
    this.medicalForm = { ...employee }; 
  }

  addForm(): void {
    this.isEditMode = false;
    this.medicalForm = {
      id: null,
      policyName: '',
      salary: 0,
      claimedAmount: 0,
      numberOfDependents: 0,
    };
  }

  validateForm(): boolean {
    if (!this.medicalForm.policyName.trim()) {
      alert(this.translateService.instant("medical_details.policy_name_alert"));
      return false;
    }
    if (this.medicalForm.salary <= 0) {
      alert(this.translateService.instant("medical_details.salary_alert"));
      return false;
    }
    if (this.medicalForm.claimedAmount < 0) {
      alert(this.translateService.instant("medical_details.claimed_amount_alert"));
      return false;
    }
    if (this.medicalForm.numberOfDependents < 0) {
      alert(this.translateService.instant("medical_details.dependents_alert"));
      return false;
    }
    return true;
  }
  
  onSubmitMedicalForm(): void {
 
    this.loading = true;
  
    if (!this.validateForm()) {
      this.loading = false; // Stop loading if validation fails
      return;
    }
 
    if (this.isEditMode) {
      this.http
        .put(
          `https://motion-referring-programmer-long.trycloudflare.com/medicalDetails/${this.medicalForm.id}`,
          this.medicalForm
        )
        .subscribe(
          () => {
            this.getMedicalDetails(); 
                
            this.isSuccessfullyAddedUpdated = true;
            setTimeout(() => {
              this.isSuccessfullyAddedUpdated = false;
            }, 3000);
          
            this.addForm();
          
            this.loading = false;
          },
          (error) => {
            console.error('Error updating medical detail:', error);
           
            this.loading = false;
          }
        );
    } else {

      const newId =
        this.medicalDetails.length > 0
          ? Math.max(...this.medicalDetails.map((item) => item.id || 0)) + 1
          : 1001; 
  
      const newMedicalDetail = {
        ...this.medicalForm,
        id: newId.toString(),
      };
  
      this.http
        .post('https://motion-referring-programmer-long.trycloudflare.com/medicalDetails', newMedicalDetail)
        .subscribe(
          () => {

            this.getMedicalDetails(); 

            this.isSuccessfullyAddedUpdated = true;
            setTimeout(() => {
              this.isSuccessfullyAddedUpdated = false;
            }, 3000);
            
            this.addForm();

            this.loading = false;
          },
          (error) => {
            console.error('Error adding medical detail:', error);
  
            this.loading = false;
          }
        );
    }
  }
  

  ngOnInit(): void {
    this.getMedicalDetails();
    this.notificationsEnabled = JSON.parse(localStorage.getItem('notifications') || 'true');
    console.log(this.notificationsEnabled);
  }
  
  calculateTotalDependents(): void {
    this.totalDependents = this.medicalDetails.reduce(
      (total, detail) => total + (detail.numberOfDependents || 0),
      0
    ); 
  }

  getMedicalDetails(): void {
    this.http.get<any[]>('https://motion-referring-programmer-long.trycloudflare.com/medicalDetails').subscribe({
      next: (data) => {
        this.medicalDetails = data.map((item) => ({
          ...item,
          policyMaxAmount: item.salary <= 500000 ? 1000000 : item.salary * 2.5, 
          balanceLeft:
            (item.salary <= 500000 ? 1000000 : item.salary * 2.5) - item.claimedAmount 
        }));
        this.calculateTotalDependents(); 
      },
      error: (err) => {
        console.error('Error fetching medical details:', err);
        this.error = 'Could not fetch medical details. Please try again later.';
      }
    });
  }
}
