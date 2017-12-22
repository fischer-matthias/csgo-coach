import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { LoggerService } from '../../services/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  public name = '';
  public desc = '';
  public activateCode = '';

  constructor(
    private teamService: TeamService,
    private logger: LoggerService,
    private router: Router
  ) {}

  public ngOnInit() {}

  public saveTeam(): void {
    const team = {
      name: this.name,
      desc: this.desc,
      activateCode: this.activateCode,
      players: []
    } as Team;

    this.teamService.createTeam(team).subscribe(result => {
      this.logger.log('Team ' + this.name + ' was created successful.');
    });
  }

  public navigateBack(): void {
    this.router.navigate(['/teams/team-list']);
  }
}
