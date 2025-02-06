import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { AuthService } from '../auth.service';

;

@Component({
  selector: 'app-login',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private translate: TranslateService
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
         
          localStorage.setItem('token', response.token);
          // Redirect to the employee list page after successful login
          this.router.navigate(['/employee-list']);
        } else {
          
          this.translate.get('login.error').subscribe((translatedText: string) => {
            this.errorMessage = translatedText;
          });
        }
      },
      error: () => {
        
        this.translate.get('login.error').subscribe((translatedText: string) => {
          this.errorMessage = translatedText;
        });
      }
    });
  }
}
