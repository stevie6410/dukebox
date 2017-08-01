import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { MdInputModule, MdInputContainer, MdCardModule, MdListModule, MdIconModule, MdButtonModule, MdSelectModule } from "@angular/material";


import { HomeComponent } from './components/home/home.component';
import { AppComponent } from "./index";
import { AppRoutingModule } from "../app-routing/app-routing.module";

import 'hammerjs';
import { FormsModule } from "@angular/forms";
import { SpotifyService } from "./services/spotify.service";
import { CallbackComponent } from './components/callback/callback.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdInputModule,
    FormsModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdSelectModule,
    MdButtonModule,
    HttpModule
  ],
  providers: [
    SpotifyService,
    {
      provide: "SpotifyConfig",
      useValue: {
        clientId: "ae2f6490e7ec4e5daeba8aecdb0e7efc",
        redirectUri: "http://localhost:4200/callback",
        scope: "user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private",
        authToken: localStorage.getItem('spotify-token')
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
