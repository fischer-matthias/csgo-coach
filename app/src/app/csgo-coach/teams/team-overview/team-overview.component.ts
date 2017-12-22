import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: 'team-overview.component.html',
  styleUrls: ['team-overview.component.css']
})

export class TeamOverviewComponent implements OnInit {

  private name: string;
  public team: Team;

  constructor(private route: ActivatedRoute, private teamService: TeamService) {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.loadTeam();
    });
  }

  ngOnInit() { }

  private loadTeam(): void {
    this.teamService.getTeam(this.name).subscribe(result => {
      this.team = result;
    });
  }
}
