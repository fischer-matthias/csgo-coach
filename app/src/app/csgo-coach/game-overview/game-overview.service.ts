import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../services/logger.service';
import { Player } from '../models/player';

@Injectable()
export class GameOverviewService {
  private behaviorMapSubject: BehaviorSubject<any>;
  private behaviorPlayerSubject: BehaviorSubject<any>;

  private ioSocket;
  private url = 'http://localhost';
  private port = '4200';

  constructor(public logger: LoggerService) {
    this.logger.log('init SocketService');

    this.initBehaviorSubject();
    this.initSocket();
  }

  private initBehaviorSubject(): void {
    this.behaviorMapSubject = new BehaviorSubject(null);
    this.behaviorPlayerSubject = new BehaviorSubject(null);
  }

  private initSocket(): void {
    this.ioSocket = io.connect(this.url + ':' + this.port);
    this.ioSocket.on('message', data => {
      const dataObject = JSON.parse(data);

      const map = dataObject['map'];
      const player = dataObject['player'] as Player;

      if (map) {
        this.behaviorMapSubject.next(map);
      }

      if (player) {
        this.behaviorPlayerSubject.next(player);
      }
    });
  }

  public getMapObservable(): Observable<any> {
    return this.behaviorMapSubject;
  }

  public getPlayerObservable(): Observable<Player> {
    return this.behaviorPlayerSubject;
  }
}
