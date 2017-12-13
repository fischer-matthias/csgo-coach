import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CSGO_COACH_ROUTES } from './csgo-coach.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { SocketService } from './services/socket.service';
import { LoggerService } from './services/logger.service';
import { SteamAuthService } from './services/steam-auth.service';
import { SteamAuthGuard } from './services/steam-auth.guard';

import { SteamUserService } from './services/steam-user.service';

import { CsgoCoachComponent } from './csgo-coach.component';
import { HomeComponent } from './home/home.component';

import { GameOverviewComponent } from './game-overview/game-overview.component';
import { PlayerComponent } from './game-overview/player/player.component';

@NgModule({
  declarations: [
    HomeComponent,
    CsgoCoachComponent,
    GameOverviewComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(CSGO_COACH_ROUTES),

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  providers: [LoggerService, SteamAuthService, SteamAuthGuard, SocketService, SteamUserService],
  exports: [CsgoCoachComponent]
})

export class CSGOCoachModule {
}
