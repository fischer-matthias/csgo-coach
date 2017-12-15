import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { SteamAuthGuard } from './services/steam-auth.guard';
import { TeamListComponent } from './team-list/team-list.component';


export const CSGO_COACH_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/team-list', pathMatch: 'full'},
  {path: 'team-list', canActivate: [SteamAuthGuard], component: TeamListComponent},
  {path: 'game-overview', canActivate: [SteamAuthGuard], component: GameOverviewComponent}
];
