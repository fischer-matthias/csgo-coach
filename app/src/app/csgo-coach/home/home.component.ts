import { Component, OnInit } from '@angular/core';
import { SteamAuthService } from "../services/steam-auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private steamAuth: SteamAuthService) {
    console.log(this.steamAuth.isLoggedIn());
  }

  ngOnInit() {
  }

}
