import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Team } from '../models/team';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) { }

  getMyTeams(uid: string): Observable<Team[]> {
    return this.http.get('/api/team')
            .map((response: any) => response as Team[]);
  }

  createTeam(team: Team): Observable<boolean> {
    return this.http.put('/api/team', team)
            .map((response: any) => response.ok);
  }
}
