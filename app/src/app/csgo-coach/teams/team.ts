export class Team {
  name: string;
  desc: string;
  players: string[];
  activateCode: string;

  constructor() {
    this.name = '';
    this.desc = '';
    this.players = [];
    this.activateCode = '';
  }
}
