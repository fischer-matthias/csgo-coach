import { PlayerState } from './player-state';
import { PlayerWeapon } from './player-weapon';
import { PlayerMatchStats } from './player-match-stats';
import { PlayerWeapons } from './player-weapons';

export class Player {
  steamid: string;
  clan: string;
  name: string;
  team: string;
  activity: string;
  state: PlayerState;
  weapons: PlayerWeapons;
  match_stats: PlayerMatchStats;
}
