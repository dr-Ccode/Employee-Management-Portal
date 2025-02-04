import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
