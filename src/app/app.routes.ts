import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { VibeshotComponent } from './vibeshot/vibeshot.component';
import { ProfileComponent } from './profile/profile.component';
import { OtpComponent } from '../auth/otp/otp.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'home', component:VibeshotComponent },
    { path: 'profile', component:ProfileComponent },
    { path: 'otp', component:OtpComponent },
    { path: '**', redirectTo: 'login' },
];
