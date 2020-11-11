import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-playlist-hub',
  templateUrl: './playlist-hub.component.html',
  styleUrls: ['./playlist-hub.component.css']
})
export class PlaylistHubComponent implements OnInit {

  /* Initialize playlist variables */
  creating_playlist   = false;
  playlist            = null;
  playlist_name       = "My Playlist";
  playlist_desc       = "Playlist created by Spotify Helper";
  playlist_embed_link = null;
  playlist_embed_link_safe: SafeResourceUrl;
  playlist_element    = null;
  playlist_tracks     = [];
  playlist_created    = false;
  playlist_published  = false;

  /* Initialize song variables */
  song_name           = null;
  song_search_results = null;
  song_string         = null;
  track_url: SafeResourceUrl;
  add                 = "add";
  remove              = "remove";

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router, private sanitizer: DomSanitizer) { 
    /* Add song to playlist */
    this.spotifyService.songAdded.subscribe(
      (track_id: string) => {
        console.log("Playlist Hub: pushing " + track_id);
        this.playlist_tracks.push(track_id);
      }
    );

    /* Remove song from playlist */
    this.spotifyService.songRemoved.subscribe(
      (track_id: string) => {
        console.log("Playlist Hub: removing " + track_id);
        var index = this.playlist_tracks.indexOf(track_id);
        if (index > -1) {
          this.playlist_tracks.splice(index, 1);
        }
      }
    );
  }

  ngOnInit(): void {
    /* Load playlists from database */
    this.spotifyService.HubPlaylists = [];
    this.spotifyService.loadAllHubPlaylists();
  }

  /* Initialize playlist state */
  initializePlaylist() {
    this.creating_playlist = true;
  }

  /* Create playlist with added songs */
  createPlaylist() {
    this.createBlankPlaylist(this.playlist_name, this.playlist_desc);
  }

  /* Creates a blank public playlist in the user's spotify profile */
  createBlankPlaylist(name: string, desc: string) {
    this.spotifyService.spotifyApi.createPlaylist(name, { 'description': desc, 'public': true })
    .then((data) => {
      console.log('Created playlist!', data.body);
      this.playlist = data.body;
      this.playlist_embed_link = "https://open.spotify.com/embed/playlist/" + data.body.id;
      this.playlist_embed_link_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlist_embed_link);
    }, function(err) {
      console.log('Something went wrong!', err);
    })
    .then(() => {
      this.populatePlaylist();
    });
  }

  /* Populate the blank playlist with the selected tracks */
  populatePlaylist() {
    for (let i = 0; i < this.playlist_tracks.length; i++) {
      this.addSongToPlaylist(this.playlist_tracks[i]);
    }
    this.creating_playlist = false;
    this.playlist_created  = true;
  }

  /* Helper function for returning spotify IDs to children */
  returnId(id: string) {
    return id;
  }
  
  /* Update input query parameters */
  onPlaylistNameInput(event: any) {
    this.playlist_name = event.target.value;
  }
  onSongNameInput(event: any) {
    this.song_name = event.target.value;
  }
  onPlaylistDescInput(event: any) {
    this.playlist_desc = event.target.value;
  }

  /* Searches for a song, stores results */
  searchSong() {
    this.spotifyService.spotifyApi.searchTracks(this.song_name).then((data) => {
      this.song_search_results = data.body.tracks.items.slice(0,7);
    }, function(err: any) {
      console.log('Something went wrong in searchSong in playlist-hub.component: ' + err); 
    });
  }

  /* Adds a single song to the Spotify playlist */
  addSongToPlaylist(track_id: string) {
    this.song_string = "spotify:track:" + track_id;
    this.spotifyService.spotifyApi.addTracksToPlaylist(this.playlist.id, [this.song_string]).then((data) => {
      console.log("added song to playlist");
    }, function (err: any) {
      console.log(err);
    });
  }

  /* Publishes the generated playlist to Spotify Helper */
  publishPlaylist() {
    this.spotifyService.publishHubPlaylist(this.playlist.id);
    this.playlist_published = true;
  }

}
