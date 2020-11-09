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

  /* Inherit playlist from parent */
  @Input() playlist: any;

  /* Initialize playlist databse variables */
  playlist_embed_url;
  safe_url;
  username;
  likes;
  dislikes;

  /* Initialize like and dislike booleans */
  liked = false;
  disliked = false;

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {

    /* Initialize iframe url */
    console.log("track " + this.playlist.id);
    this.playlist_embed_url = "https://open.spotify.com/embed/playlist/" + this.playlist.get('playlist_id');
    console.log(this.playlist_embed_url);
    this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlist_embed_url);

    /* Initialize username and likes */
    this.username = this.playlist.get('username');
    this.likes = this.playlist.get('likes');
    this.dislikes = this.playlist.get('dislikes');
  }

  upvote() {
    if (!this.liked) {
      this.likes = this.likes + 1;
      this.liked = true;
      this.spotifyService.updateHubPlaylist(this.playlist.id, this.likes, this.dislikes);
    }
  }

  downvote() {
    if (!this.disliked) {
      this.dislikes = this.dislikes + 1;
      this.disliked = true;
      this.spotifyService.updateHubPlaylist(this.playlist.id, this.likes, this.dislikes);
    }
  }

}
