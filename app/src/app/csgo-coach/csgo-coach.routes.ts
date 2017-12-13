import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { SteamAuthGuard } from './services/steam-auth.guard';


export const CSGO_COACH_ROUTES: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'game-overview', canActivate: [SteamAuthGuard], component: GameOverviewComponent}
];
