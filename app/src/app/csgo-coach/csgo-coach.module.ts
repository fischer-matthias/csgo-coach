import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketService } from './services/socket.service';
import { LoggerService } from './services/logger.service';
import { CsgoCoachComponent } from './csgo-coach.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';

@NgModule({
  declarations: [
    CsgoCoachComponent,
    GameOverviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LoggerService,
    SocketService
  ],
  exports: [
    CsgoCoachComponent
  ]
})
export class CSGOCoachModule { }