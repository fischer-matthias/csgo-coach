import { Component } from '@angular/core';
import { SteamAuthService } from './services/steam-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csgo-coach',
  templateUrl: './csgo-coach.component.html',
  styleUrls: ['./csgo-coach.component.css']
})
export class CsgoCoachComponent {
  loggedIn = false;

  constructor(private steamAuth: SteamAuthService, private router: Router) {
    this.steamAuth.isLoggedIn().then(result => (this.loggedIn = result));
  }

  public navigate(route: string): void {
    this.router.navigate([route]);
  }
}
