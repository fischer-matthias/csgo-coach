import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import {SocketService} from './services/socket.service';
import {LoggerService} from './services/logger.service';
import {SteamUserService} from "./services/steam-user.service";
import {CsgoCoachComponent} from './csgo-coach.component';

import {GameOverviewComponent} from './game-overview/game-overview.component';
import {PlayerComponent} from "./game-overview/player/player.component";

@NgModule({
  declarations: [
    CsgoCoachComponent,
    GameOverviewComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  providers: [
    LoggerService,
    SocketService,
    SteamUserService
  ],
  exports: [
    CsgoCoachComponent
  ]
})
export class CSGOCoachModule {
}
