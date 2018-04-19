import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../services/logger.service';
import { Player } from '../models/player';
import { HttpClient } from '@angular/common/http';
import { Team } from '../teams/team';

@Injectable()
export class GameOverviewService {
  private behaviorMapSubject: BehaviorSubject<any>;
  private behaviorPlayerSubject: BehaviorSubject<any>;

  private ioSocket;
  private url = 'http://localhost';
  private port = '4200';

  constructor(public logger: LoggerService, public http: HttpClient) {
    this.logger.log('init SocketService');
    this.initBehaviorSubject();
  }

  private initBehaviorSubject(): void {
    this.behaviorMapSubject = new BehaviorSubject(null);
    this.behaviorPlayerSubject = new BehaviorSubject(null);
  }

  public joinTeamRoom(team: Team): void {
    this.http.get('/api/room/' + team.name)
      .subscribe(result => {
        this.initSocket(result['key']);
      });
  }

  private initSocket(roomKey: string): void {
    this.logger.log('Try to join room with key: ' + roomKey);

    this.ioSocket = io.connect(this.url + ':' + this.port);
    this.ioSocket.on('connect', () => { 
      this.ioSocket.emit('room', roomKey);
    });

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
