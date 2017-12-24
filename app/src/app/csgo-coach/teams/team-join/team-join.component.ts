import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-join',
  templateUrl: 'team-join.component.html',
  styleUrls: ['team-join.component.css']
})
export class TeamJoinComponent implements OnInit {
  constructor(private router: Router, private teamService: TeamService) {}

  public teamName = '';
  public activationCode = '';

  public ngOnInit() {}

  public joinTeam(): void {
    this.teamService.joinTeam(this.teamName, this.activationCode)
      .subscribe((result: boolean) => {
        console.log('hurrray');
      });
  }

  public navigateBack(): void {
    this.router.navigate(['/teams/team-list']);
  }
}
