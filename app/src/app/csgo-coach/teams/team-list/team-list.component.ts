import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { SteamAuthService } from '../../services/steam-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[];

  constructor(
    private steamAuth: SteamAuthService,
    private teamService: TeamService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.teamService
      .getMyTeams(this.steamAuth.getUserId())
      .subscribe((teams: Team[]) => {
        this.teams = teams;
      });
  }

  public joinTeam(): void {}

  public createTeam(): void {
    this.router.navigate(['/teams/team-edit']);
  }
}
