import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteamAuthService } from '../services/steam-auth.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private steamAuth: SteamAuthService,
              private logger: LoggerService,
              private router: Router) {

    this.steamAuth.isLoggedIn()
      .then((result) => {
        if (result) {
          this.router.navigate(['/']);
          this.logger.log('User is logged in.');
        } else {
          this.logger.log('User is not logged in.');
        }
      });
  }

  ngOnInit() {
  }

}
