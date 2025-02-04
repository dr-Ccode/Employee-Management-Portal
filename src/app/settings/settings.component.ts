import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule,  TranslateModule, TranslatePipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})

export class SettingsComponent {
  theme: string = localStorage.getItem('theme') || 'light';
  selectedLanguage: string = 'en';
  notificationsEnabled: boolean = localStorage.getItem('notification') === 'false';

  languages = [
    {code: 'en', label: 'English'},
    {code: 'fr', label: 'Francais'}
  ]

  constructor(private translate: TranslateService, private http: HttpClient) {
    this.applyTheme();

    const savedLang = localStorage.getItem('language') || 'en';
  this.selectedLanguage = savedLang;
  this.translate.setDefaultLang(savedLang);
  this.translate.use(savedLang);

  const storedNotificationState = localStorage.getItem('notifications');
  this.notificationsEnabled = storedNotificationState ? JSON.parse(storedNotificationState) : true;

  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.setAttribute('data-theme', this.theme);
  }


  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    localStorage.setItem('language', lang);
    this.translate.use(lang).subscribe(() => {
      console.log('Language switched to:', lang);
      this.translate.get('settings.title').subscribe(value => {
        console.log('Loaded translation:', value);
      });
    });
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled;
    localStorage.setItem('notifications', JSON.stringify(this.notificationsEnabled));
    console.log('Notifications enabled:', this.notificationsEnabled);
  }
  
}
