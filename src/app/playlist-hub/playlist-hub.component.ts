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

  /* Initialize variables */
  creating_playlist = false;
  playlist = null;
  playlist_name = "My Playlist";
  playlist_desc = "Playlist created by Spotify Helper";
  playlist_embed_link = null;
  playlist_embed_link_safe: SafeResourceUrl;
  playlist_element = null;
  playlist_tracks = [];
  playlist_created = false;

  song_name = null;
  song_search_results = null;
  song_string = null;

  track_url: SafeResourceUrl;

  add = "add";
  remove = "remove";

  constructor(public http: HttpClient, public spotifyService: SpotifyService, private router: Router, private sanitizer: DomSanitizer) { 
    this.spotifyService.songAdded.subscribe(
      (track_id: string) => {
        console.log("Playlist Hub: pushing " + track_id);
        this.playlist_tracks.push(track_id);
      }
    );
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
    console.log("In playlist-hub init");
    this.spotifyService.HubPlaylists = [];
    this.spotifyService.loadAllHubPlaylists();
  }

  /* Initialize playlist */
  initializePlaylist() {
    this.creating_playlist = true;
  }

  /* Create playlist with added songs */
  createPlaylist() {
    this.createBlankPlaylist(this.playlist_name, this.playlist_desc);
    console.log("Playlist created: " + this.playlist_name);
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
      this.populatePlaylist()
    });
  }

  populatePlaylist() {
    console.log("POPULATING PLAYLIST")
    for (let i = 0; i < this.playlist_tracks.length; i++) {
      console.log("Added " + this.playlist_tracks[i] + "to the playlist...");
      this.addSongToPlaylist(this.playlist_tracks[i]);
    }
    this.creating_playlist = false;
    this.playlist_created = true;
  }

  returnId(id: string) {
    // console.log("returning " + id);
    return id;
  }
  
  /* Update search query parameters */
  onPlaylistNameInput(event: any) {
    this.playlist_name = event.target.value;
  }
  onSongNameInput(event: any) {
    this.song_name = event.target.value;
  }
  onPlaylistDescInput(event: any) {
    this.playlist_desc = event.target.value;
  }

  searchSong() {
    this.spotifyService.spotifyApi.searchTracks(this.song_name).then((data) => {
      this.song_search_results = data.body.tracks.items.slice(0,7);
    }, function(err: any) {
      console.log('Something went wrong in searchSong in playlist-hub.component: ' + err); 
    });
  }

  addSongToPlaylist(track_id: string) {
    this.song_string = "spotify:track:" + track_id;
    this.spotifyService.spotifyApi.addTracksToPlaylist(this.playlist.id, [this.song_string]).then((data) => {
      console.log("added song to playlist");
    }, function (err: any) {
      console.log(err);
    });
  }

  publishPlaylist() {
    this.spotifyService.publishHubPlaylist(this.playlist.id);
  }

}