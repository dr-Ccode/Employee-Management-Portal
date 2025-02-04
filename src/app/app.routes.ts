import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  EmployeeChartsComponent,
} from './employee-charts/employee-charts.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {
  MedicalDetailsComponent,
} from './employee-medical-details/employee-medical-details.component';
//import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'home', component: DashboardComponent},
    {path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard]},
    {path: 'medical-details', component: MedicalDetailsComponent, canActivate: [AuthGuard]},
    {path: 'charts', component: EmployeeChartsComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotFoundComponent}
];
