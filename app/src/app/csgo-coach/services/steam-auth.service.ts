import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SteamAuthService {

  private loggedIn: boolean;
  private userStatus: any;

  constructor(private httpClient: HttpClient) {
    this.getUserStatus();
  }

  private getUserStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('/steam/status').subscribe((status) => {

        if (status === null || status['user'] === null) {
          this.loggedIn = false;
        } else {
          this.userStatus = status;
          this.loggedIn = true;
        }

        resolve(true);
      });

    });
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.loggedIn !== undefined) {
        resolve(this.loggedIn);
      } else {
        this.getUserStatus()
          .then((__resolve) => {
            resolve(this.loggedIn);
          });
      }
    });
  }

  public getUserId(): string {
    return this.userStatus.uid;
  }
}
