import {Component} from '@angular/core';
import { SteamAuthService } from './services/steam-auth.service';

@Component({
  selector: 'app-csgo-coach',
  templateUrl: './csgo-coach.component.html',
  styleUrls: ['./csgo-coach.component.css']
})
export class CsgoCoachComponent {

  loggedIn = false;

  constructor(private steamAuth: SteamAuthService) {
    this.steamAuth.isLoggedIn()
      .then((result) => this.loggedIn = result);
  }

}
