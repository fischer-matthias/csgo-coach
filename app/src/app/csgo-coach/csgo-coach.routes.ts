import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameOverviewComponent } from "./game-overview/game-overview.component";


export const CSGO_COACH_ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'game-overview', component: GameOverviewComponent}
];
