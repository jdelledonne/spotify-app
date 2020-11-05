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

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router) { }

  token: string;

  ngOnInit(): void {
    console.log("in home ngOnInit"); 
    console.log(this.spotifyService.isSpotifyAuthenticated);
    this.token = window.location.hash.split("=")[1].split("&")[0]
    console.log("token: " + this.token);
    this.spotifyService.updateToken(this.token);
    this.spotifyService.getSpotifyNode(); 

    //test 
    this.spotifyService.spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function(data) {
        console.log('Artist albums', data.body); 
      },
      function(err) {
        console.error(err); 
      }
    );

  }

  spotifyLogin() {
    this.spotifyService.linkSpotify();
  }

  gotoAuthentication() {
    this.router.navigate(['/auth']);
  }
}
