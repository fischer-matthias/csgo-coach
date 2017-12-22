import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Team } from './team';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) { }

  getMyTeams(uid: string): Observable<Team[]> {
    return this.http.get('/api/teams')
            .map((response: any) => response.teams as Team[]);
  }

  getTeam(name: string): Observable<Team> {
    return this.http.get('/api/teams/' + name)
            .map((response: any) => response.team as Team);
  }

  setTeam(team: Team): Observable<boolean> {
    return this.http.post('/api/teams/' + team.name, team)
            .map((response: any) => response.ok);
  }

  createTeam(team: Team): Observable<boolean> {
    return this.http.put('/api/teams', team)
            .map((response: any) => response.ok);
  }
}
