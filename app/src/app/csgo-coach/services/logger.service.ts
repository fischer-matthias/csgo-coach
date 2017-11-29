import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  public log(message: string): void {
    var currentDate = new Date();
    var currentTimeStamp = currentDate.getDate() + '/'
        + (currentDate.getMonth()+1)  + '/' 
        + currentDate.getFullYear() + ' @ '  
        + currentDate.getHours() + ':'  
        + currentDate.getMinutes() + ':' 
        + currentDate.getSeconds();

    console.log(currentTimeStamp + ': ' + message);
  }

}
