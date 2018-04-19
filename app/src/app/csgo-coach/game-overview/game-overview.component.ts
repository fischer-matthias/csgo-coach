import { Component, OnInit } from '@angular/core';

import { GameOverviewService } from './game-overview.service';
import { LoggerService } from '../services/logger.service';

import { Player } from '../models/player';
import { Lobby } from '../models/lobby';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {
  mapInfo: any;
  player: Player;

  lobbyName: string = '';
  lobbyKey: string = '';

  lobby: Lobby = null;

  constructor(
    private logger: LoggerService,
    private gameOverviewService: GameOverviewService,
  ) {
    this.logger.log('Start application.');

    this.gameOverviewService.getMapObservable().subscribe(data => {
      this.mapInfo = data;
    });

    this.gameOverviewService.getPlayerObservable().subscribe(player => {
      this.player = player;
    });
  }

  ngOnInit() {}

  public createLobby(): void {
    if (this.lobbyName != null) {
      this.gameOverviewService.createLobby(this.lobbyName)
        .then((lobby) => {
          this.lobby = lobby;
        });
    }
  }

  public joinLobby(): void {
    if (this.lobbyKey != null) {
      this.gameOverviewService.joinLobby(this.lobbyKey)
        .then((lobby) => {
          this.lobby = lobby;
        });
    }
  }
}
