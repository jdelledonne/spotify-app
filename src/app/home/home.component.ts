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

  constructor(public http: HttpClient, private spotifyService: SpotifyService, private router: Router) { }

  token: string;

  ngOnInit(): void {
    console.log("in home ngOnInit"); 
    this.token = window.location.hash.split("=")[1].split("&")[0]
    console.log("token: " + this.token);
    this.spotifyService.updateToken(this.token);
  }

  spotifyLogin() {
      window.location.href="https://accounts.spotify.com/authorize?client_id=45ac1879f9d14dafb67829763149c11e&redirect_uri=http://localhost:4200/&scope=user-read-private%20user-read-email&response_type=token&state=123";
  }

  gotoAuthentication() {
    this.router.navigate(['/auth']);
  }
}
