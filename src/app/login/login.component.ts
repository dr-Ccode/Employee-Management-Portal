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
          // Store the JWT token in localStorage
          localStorage.setItem('token', response.token);
          // Redirect to the employee list page after successful login
          this.router.navigate(['/employee-list']);
        } else {
          // Handle invalid credentials scenario
          this.translate.get('login.error').subscribe((translatedText: string) => {
            this.errorMessage = translatedText;
          });
        }
      },
      error: () => {
        // Handle other potential errors (e.g., server errors)
        this.translate.get('login.error').subscribe((translatedText: string) => {
          this.errorMessage = translatedText;
        });
      }
    });
  }
}
