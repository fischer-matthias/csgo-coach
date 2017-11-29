import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from './logger.service';

@Injectable()
export class SocketService {

  private behaviorSubject: BehaviorSubject<any>;

  private ioSocket;
  private url = 'http://localhost';
  private port = '4200';

  constructor(public logger: LoggerService) {
    this.logger.log('init SocketService');

    this.initBehaviorSubject();
    this.initSocket();
  }

  private initBehaviorSubject(): void {
    this.behaviorSubject = new BehaviorSubject(null);
  }

  private initSocket(): void {

    this.ioSocket = io.connect(this.url + ':' + this.port);
    this.ioSocket.on('message', (data) => {
      this.logger.log(data);
      this.behaviorSubject.next(data);
    });
  }

  public getObservable(): Observable<any> {
    return this.behaviorSubject;
  }

}
