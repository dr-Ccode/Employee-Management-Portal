import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  Observable,
  of,
} from 'rxjs';  // 'of' is used to return mock data

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private mockUsername = 'David'; // Hardcoded username
  private mockPassword = 'david@123'; // Hardcoded password

  constructor(private http: HttpClient, private router: Router, private translate: TranslateService) {}

  // Login method with mock credentials check
  login(username: string, password: string): Observable<{ token: string }> {
    if (username === this.mockUsername && password === this.mockPassword) {
      return of({ token: 'mock-jwt-token-12345' }); // Mock token response
    } else {
      return of({ token: '' }).pipe(
        catchError((error) => {
          // Handle error here
          this.translate.get('login.error').subscribe((translatedText: string) => {
            console.error(translatedText); // Optional: Log the error to the console
          });
          throw error; // Re-throw the error after logging
        })
      );
    }
  }
  

  // Logout method to clear the JWT token and navigate to login page
  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Check if user is authenticated (token exists)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists
  }

  // Get JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token'); // Returns token or null
  }
}
