import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SteamAuthService } from './steam-auth.service';

@Injectable()
export class SteamAuthGuard implements CanActivate {

  constructor(private steamAuth: SteamAuthService,
              private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.steamAuth.isLoggedIn().then((result) => {
        if (result) {
          resolve(true);
        } else {
          this.router.navigate(['/home']);
          resolve(false);
        }
      });
    });
  }
}
