import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../models/player";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() player: Player = null;

  constructor() { }

  ngOnInit() {
  }

}
