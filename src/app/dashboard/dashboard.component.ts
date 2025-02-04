import { Component } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string = '';

  constructor(private authService: AuthService) {
    //this.username = this.authService.getUsername();
  }
}
