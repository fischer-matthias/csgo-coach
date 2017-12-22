import { Component } from '@angular/core';
import { SteamAuthService } from './services/steam-auth.service';
import { Router } from '@angular/router';
import { LoggerService } from './services/logger.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-csgo-coach',
  templateUrl: './csgo-coach.component.html',
  styleUrls: ['./csgo-coach.component.css']
})
export class CsgoCoachComponent implements OnInit {
  private routes = ['/teams/team-list', '/statistic', '/game-overview'];
  public loggedIn = false;
  public index: number;

  constructor(
    private steamAuth: SteamAuthService,
    private router: Router,
    private logger: LoggerService
  ) {
    this.steamAuth.isLoggedIn().then(result => (this.loggedIn = result));
  }

  public ngOnInit(): void {
    this.logger.log(this.router.url);
    const index = this.routes.indexOf(this.router.url);

    if (index) {
      this.index = index;
    }
  }

  public tabSelectionChanged(index: number): void {
    this.navigate(this.routes[index]);
  }

  public navigate(route: string): void {
    this.logger.log('Navigate to: ' + route);
    this.router.navigate([route]);
  }
}
