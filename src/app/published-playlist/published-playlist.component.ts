import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ɵSafeResourceUrl } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-published-playlist',
  templateUrl: './published-playlist.component.html',
  styleUrls: ['./published-playlist.component.css']
})
export class PublishedPlaylistComponent implements OnInit {

  /* Inherit playlist id from parent */
  @Input() playlist_id: string;

  playlist_embed_url;
  safe_url;

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    console.log("in track " + this.playlist_id + " onInit...");
    this.playlist_embed_url = "https://open.spotify.com/embed/playlist/" + this.playlist_id;
    console.log(this.playlist_embed_url);
    this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlist_embed_url);
  }

}
