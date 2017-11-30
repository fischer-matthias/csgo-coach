import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
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