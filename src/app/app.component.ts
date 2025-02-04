import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  RouterOutlet,
} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    // Check localStorage for language preference
    const savedLang = localStorage.getItem('language') || 'en'; // Default to 'en'
    
    // Set the default language and use it
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang).subscribe(() => {
      console.log('Language set to:', savedLang);
    });
  }
}