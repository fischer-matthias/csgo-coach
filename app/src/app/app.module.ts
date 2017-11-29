import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CSGOCoachModule } from './csgo-coach/csgo-coach.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CSGOCoachModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
