import { Component, OnInit } from '@angular/core';

import { GameOverviewService } from './game-overview.service';
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
    private gameOverviewService: GameOverviewService,
    private teamService: TeamService
  ) {
    this.logger.log('Start application.');

    this.gameOverviewService.getMapObservable().subscribe(data => {
      this.mapInfo = data;
    });

    this.gameOverviewService.getPlayerObservable().subscribe(player => {
      this.player = player;
    });

    this.teamService.getMyTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  ngOnInit() {}

  public joinRoom(): void {

  }
}
