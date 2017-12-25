import { Component, OnInit } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { LoggerService } from '../services/logger.service';

import { Player } from '../models/player';
import { TeamService } from '../teams/team.service';
import { Team } from '../teams/team';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {
  mapInfo: any;
  player: Player;
  teams: Team[];

  constructor(
    private logger: LoggerService,
    private socketService: SocketService,
    private teamService: TeamService
  ) {
    this.logger.log('Start application.');

    this.socketService.getMapObservable().subscribe(data => {
      this.mapInfo = data;
    });

    this.socketService.getPlayerObservable().subscribe(player => {
      this.player = player;
    });

    this.teamService.getMyTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  ngOnInit() {}

  public startGame(): void {

  }
}
