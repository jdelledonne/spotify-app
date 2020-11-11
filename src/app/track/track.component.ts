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

  /* Inherit track url and mode (add or remove) from parent */
  @Input() track_id: string;
  @Input() mode: string;
  
  /* Initialize track variables */
  track_embed_url: string;
  safe_url: SafeResourceUrl;

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    /* Construct safe track url for embedding in DOM */
    this.track_embed_url = "https://open.spotify.com/embed/track/" + this.track_id;
    this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.track_embed_url);
  }

  /* Adds track to the playlist being created */
  addSong() {
    console.log("Track: Adding " + this.track_id)
    this.spotifyService.songAdded.emit(this.track_id);
  }

  /* Removes track from the playlist being created */
  removeSong() {
    console.log("Track:Removing " + this.track_id)
    this.spotifyService.songRemoved.emit(this.track_id);
  }
}
