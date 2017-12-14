import {PlayerState} from './player-state';
import {PlayerWeapon} from './player-weapon';
import {PlayerMatchStats} from './player-match-stats';

export class Player {
  steamid: string;
  clan: string;
  name: string;
  team: string;
  activity: string;
  state: PlayerState;
  weapons: PlayerWeapon[];
  match_stats: PlayerMatchStats;
}
