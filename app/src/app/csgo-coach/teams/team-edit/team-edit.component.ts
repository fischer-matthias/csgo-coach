import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { LoggerService } from '../../services/logger.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  public editMode = false;
  public team = new Team();

  constructor(
    private teamService: TeamService,
    private logger: LoggerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.editMode = true;
        this.loadTeam(params['name']);
      }
    });
  }

  public ngOnInit() {}

  private loadTeam(name: string): void {
    this.teamService.getTeam(name).subscribe(result => {
      this.team = result;
    });
  }

  public saveTeam(): void {
    if (this.editMode) {
      this.teamService.setTeam(this.team).subscribe(result => {
        this.logger.log('Team ' + this.team.name + ' was updated successful.');
        this.router.navigate(['/teams/team-list']);
      });
    } else {
      this.teamService.createTeam(this.team).subscribe(result => {
        this.logger.log('Team ' + this.team.name + ' was created successful.');
        this.router.navigate(['/teams/team-list']);
      });
    }
  }

  public navigateBack(): void {
    this.router.navigate(['/teams/team-list']);
  }
}
