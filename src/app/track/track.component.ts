import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ɵSafeResourceUrl } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  /* Inherit track url from parent */
  @Input() track_id: string;
  @Input() mode: string;
  
  track_embed_url: string;
  safe_url: SafeResourceUrl;

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router, private sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
    console.log("in track " + this.track_id + " onInit...");
    this.track_embed_url = "https://open.spotify.com/embed/track/" + this.track_id;
    console.log(this.track_embed_url);
    this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.track_embed_url);
    console.log(this.mode);
  }

  addSong() {
    console.log("Track: Adding " + this.track_id)
    this.spotifyService.songAdded.emit(this.track_id);
  }

  removeSong() {
    console.log("Track:Removing " + this.track_id)
    this.spotifyService.songRemoved.emit(this.track_id);
  }

}
