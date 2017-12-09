import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const CSGO_COACH_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
