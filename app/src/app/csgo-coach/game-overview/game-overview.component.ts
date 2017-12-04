import {Component, OnInit} from '@angular/core';

import {SocketService} from '../services/socket.service';
import {LoggerService} from '../services/logger.service';

import {Player} from "../models/player";

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  mapInfo: any;
  player: Player;

  constructor(public logger: LoggerService,
              public socketService: SocketService) {

    this.logger.log('Start application.');

    this.socketService.getMapObservable().subscribe((data) => {
      this.logger.log(JSON.stringify(data));
      this.mapInfo = data;
    });

    this.socketService.getPlayerObservable().subscribe( (player) => {
      this.logger.log(JSON.stringify(player));
      this.player = player;
    });
  }

  ngOnInit() {
  }

}
