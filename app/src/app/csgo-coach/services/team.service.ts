import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Team } from '../models/team';

@Injectable()
export class TeamService {
  constructor(private http: Http) { }

  getMyTeams(uid: string): Observable<Team[]> {
    return this.http.get('/api/team')
            .map((response: Response) => response.json() as Team[]);
  }

  createTeam(team: Team): Observable<boolean> {
    return this.http.put('/api/team', team)
            .map((response: Response) => response.ok);
  }
}
