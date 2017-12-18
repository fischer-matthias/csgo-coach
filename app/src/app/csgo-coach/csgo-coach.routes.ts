import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { SteamAuthGuard } from './services/steam-auth.guard';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';


export const CSGO_COACH_ROUTES: Routes = [

  {path: '', redirectTo: 'teams/team-list', pathMatch: 'full'},
  {path: 'teams/team-list', canActivate: [SteamAuthGuard], component: TeamListComponent},
  {path: 'teams/team-edit', canActivate: [SteamAuthGuard], component: TeamEditComponent},

  {path: 'home', component: HomeComponent},
  {path: 'game-overview', canActivate: [SteamAuthGuard], component: GameOverviewComponent}
];
