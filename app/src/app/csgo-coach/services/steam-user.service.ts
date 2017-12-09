import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable()
export class SteamUserService {
  private KEY = 'DD90123A70E8A78090A22960275A8EF4';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getUserInfo(uID: string) {
    this.http
      .get(
        'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' +
          this.KEY +
          '&steamids=' +
          uID
      )
      .subscribe(data => {
        this.logger.log(JSON.stringify(data));
      });
  }
}
