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
 
  private mockUsername = 'David'; 
  private mockPassword = 'david@123'; 

  constructor(private http: HttpClient, private router: Router, private translate: TranslateService) {}

  
  login(username: string, password: string): Observable<{ token: string }> {
    if (username === this.mockUsername && password === this.mockPassword) {
      return of({ token: 'mock-jwt-token-12345' }); 
    } else {
      return of({ token: '' }).pipe(
        catchError((error) => {
          
          this.translate.get('login.error').subscribe((translatedText: string) => {
            console.error(translatedText); 
          });
          throw error; 
        })
      );
    }
  }
  


  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }

  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
