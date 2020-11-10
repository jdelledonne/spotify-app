import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router) { 
    console.log(this.temp);
    this.isSpotifyAuthenticated = this.spotifyService.isSpotifyAuthenticated;
  }

  token: string;
  isSpotifyAuthenticated = false;
  temp = true;

  ngOnInit(): void {
    console.log("in home ngOnInit"); 
    console.log(this.spotifyService.isSpotifyAuthenticated);
    console.log(this.temp);
    if (window.location.hash) {
      this.token = window.location.hash.split("=")[1].split("&")[0]
      console.log("token: " + this.token);
      this.spotifyService.updateToken(this.token);
      this.spotifyService.getSpotifyNode(); 
    }
    //this.router.navigate(['/']);
    
  }

  spotifyLogin() {
    this.spotifyService.linkSpotify();
    this.router.navigate(['/']);
  }

  gotoAuthentication() {
    this.router.navigate(['/auth']);
  }

  /* logout current user */
  logout() {
    // Parse logout user code goes here
    console.log("logging out ", this.spotifyService.user);
    this.spotifyService.current_user = null;
    this.spotifyService.history = [];
    this.spotifyService.isLoggedIn = false;
    this.spotifyService.user = null;
    this.gotoAuthentication();
  }
}
