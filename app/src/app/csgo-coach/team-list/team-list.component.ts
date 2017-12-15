import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { SteamAuthService } from '../services/steam-auth.service';

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

    teams: Team[];

    constructor(private steamAuth: SteamAuthService,
        private teamService: TeamService) {
        }

        ngOnInit() {
            this.teamService.getMyTeams(this.steamAuth.getUserId())
            .subscribe((teams: Team[]) => {
                this.teams = teams;
            });
        }

    }
