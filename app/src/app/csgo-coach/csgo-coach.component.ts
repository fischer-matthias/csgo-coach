import { Component } from '@angular/core';
import { SteamAuthService } from './services/steam-auth.service';
import { Router } from '@angular/router';
import { LoggerService } from './services/logger.service';

@Component({
    selector: 'app-csgo-coach',
    templateUrl: './csgo-coach.component.html',
    styleUrls: ['./csgo-coach.component.css']
})
export class CsgoCoachComponent {
    private routes = ['/teams/team-list', '/', '/game-overview'];

    public loggedIn = false;

    constructor(private steamAuth: SteamAuthService, private router: Router, private logger: LoggerService) {
        this.steamAuth.isLoggedIn().then(result => (this.loggedIn = result));
    }

    public tabSelectionChanged(index: number): void {
        this.navigate(this.routes[index]);
    }

    public navigate(route: string): void {
        this.logger.log('Navigate to: ' + route);
        this.router.navigate([route]);
    }
}
