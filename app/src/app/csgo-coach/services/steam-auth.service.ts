import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SteamAuthService {

  private loggedIn: boolean;
  private userStatus: any;

  constructor(private httpClient: HttpClient) {
    this.loggedIn = false;
    this.getUserStatus();
  }

  private getUserStatus(): any {
    this.httpClient.get('/steam/status').subscribe((status) => {
      this.userStatus = status;

      if(this.userStatus.user) {
        this.loggedIn = true;
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
