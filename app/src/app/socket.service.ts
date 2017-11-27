import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) {
    socket.on('message', () => {
      console.log('message recieved.');
    });
  }

}
