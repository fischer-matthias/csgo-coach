import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../services/logger.service';
import { Player } from '../models/player';
import { HttpClient } from '@angular/common/http';
import { Lobby } from '../models/lobby';

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

  /**
   * Get current lobby
   */
  public getLobby(): Promise<Lobby> {
    return new Promise((resolve, reject) => {
      this.http.get('/api/lobby')
        .subscribe(result => {
          if(result['error']) {
            reject('error');
          } else {
            resolve(result as Lobby);
          }
        });
    });
  }

  /**
   * Create a new lobby
   * @param lobbyName 
   */
  public createLobby(lobbyName): Promise<Lobby> {
    return new Promise((resolve, reject) => {
      this.http.put('/api/lobby', {name: lobbyName})
      .subscribe(result => {
        if(result['error']) {
          reject('error');
        } else {
          this.initSocket(result['key']);
          resolve(result as Lobby);
        }
      });
    });
  }

  /**
   * Join a lobby
   * @param lobbyKey
   */
  public joinLobby(lobbyKey): Promise<Lobby> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/lobby', {key: lobbyKey})
      .subscribe(result => {
        if(result['error']) {
          reject('error');
        } else {
          this.initSocket(result['key']);
          resolve(result as Lobby);
        }
      });
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
