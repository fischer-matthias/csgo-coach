import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { SteamAuthGuard } from './services/steam-auth.guard';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamOverviewComponent } from './teams/team-overview/team-overview.component';


export const CSGO_COACH_ROUTES: Routes = [

  {path: '', redirectTo: 'teams/team-list', pathMatch: 'full'},
  {path: 'teams/team-list', canActivate: [SteamAuthGuard], component: TeamListComponent},
  {path: 'teams/team-edit', canActivate: [SteamAuthGuard], component: TeamEditComponent},
  {path: 'teams/team-edit/:name', canActivate: [SteamAuthGuard], component: TeamEditComponent},
  {path: 'teams/team-overview/:name', canActivate: [SteamAuthGuard], component: TeamOverviewComponent},

  {path: 'home', component: HomeComponent},
  {path: 'game-overview', canActivate: [SteamAuthGuard], component: GameOverviewComponent}
];
