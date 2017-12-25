import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[];

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.teamService
      .getMyTeams()
      .subscribe((teams: Team[]) => {
        this.teams = teams;
      });
  }

  public joinTeam(): void {
    this.router.navigate(['/teams/join']);
  }

  public createTeam(): void {
    this.router.navigate(['/teams/team-edit']);
  }

  public navigateToOverview(name: string): void {
    this.router.navigate(['/teams/team-overview', name]);
  }

  public navigateToEdit(name: string): void {
    this.router.navigate(['/teams/team-edit', name]);
  }
}
