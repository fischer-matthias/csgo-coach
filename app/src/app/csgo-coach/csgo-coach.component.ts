import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-csgo-coach',
  templateUrl: './csgo-coach.component.html',
  styleUrls: ['./csgo-coach.component.css']
})
export class CsgoCoachComponent {

  constructor(public logger: LoggerService,
              public socketService: SocketService) {

      this.logger.log('Start application.');

      this.socketService.getObservable().subscribe((data) => {
        this.logger.log(data);
      });
    }

}
