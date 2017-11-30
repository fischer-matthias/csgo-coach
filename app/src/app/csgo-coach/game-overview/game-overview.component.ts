import { Component, OnInit, Input } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {

  mapInfo: any;

  constructor(public logger: LoggerService,
              public socketService: SocketService) {

    this.logger.log('Start application.');

    this.socketService.getMapObservable().subscribe((data) => {
      this.logger.log(data);
      this.mapInfo = data;
    });
  }

  ngOnInit() {
  }

}
