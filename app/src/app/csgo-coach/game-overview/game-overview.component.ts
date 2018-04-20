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
    this.gameOverviewService.getMapObservable().subscribe(data => this.mapInfo = data);
    this.gameOverviewService.getPlayerObservable().subscribe(player => this.player = player);
  }

  ngOnInit() {
    this.gameOverviewService.getLobby().then(lobby => this.lobby = lobby);    
  }

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

  public leaveLobby(): void {
    if(this.lobby.key != null) {
      this.gameOverviewService.leaveLobby(this.lobby.key)
        .then((status) => {
          if(status) {
            this.lobby = null;
            this.lobbyName = '';
            this.lobbyKey = '';
            this.mapInfo = null;
            this.player = null;
          }
        });
    }
  }
}
