import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CSGO_COACH_ROUTES } from './csgo-coach.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { LoggerService } from './services/logger.service';
import { SteamAuthService } from './services/steam-auth.service';
import { SteamAuthGuard } from './services/steam-auth.guard';

import { SteamUserService } from './services/steam-user.service';

import { CsgoCoachComponent } from './csgo-coach.component';
import { HomeComponent } from './home/home.component';

import { GameOverviewComponent } from './game-overview/game-overview.component';
import { PlayerComponent } from './game-overview/player/player.component';

import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamService } from './teams/team.service';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamOverviewComponent } from './teams/team-overview/team-overview.component';
import { TeamJoinComponent } from './teams/team-join/team-join.component';
import { GameOverviewService } from './game-overview/game-overview.service';

@NgModule({
  declarations: [
    HomeComponent,
    CsgoCoachComponent,

    TeamListComponent,
    TeamEditComponent,
    TeamOverviewComponent,
    TeamJoinComponent,

    GameOverviewComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(CSGO_COACH_ROUTES),

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [
    LoggerService,
    SteamAuthService,
    SteamAuthGuard,
    GameOverviewService,
    SteamUserService,
    TeamService
  ],
  exports: [CsgoCoachComponent]
})
export class CSGOCoachModule {}
