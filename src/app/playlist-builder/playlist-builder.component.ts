import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-playlist-builder',
  templateUrl: './playlist-builder.component.html',
  styleUrls: ['./playlist-builder.component.css']
})
export class PlaylistBuilderComponent implements OnInit {

  searchartist = 'Default artist'; 
  searchsongval = 'Default song'; 
  recentSearchBase = 'https://open.spotify.com/embed/track/'; 
  recentSearchId = '5ihS6UUlyQAfmp48eSkxuQ'; 
  history = this.spotifyService.history;
  playlistId = 'Default Id'; 
  searchSongId = '0'; 
  playlistSongs = []; 
  playlistSongNames = []; 
  searchSongName = 'Default song'; 
  searchSongArtist = 'Default artist'; 
  el = null; 
  allDataCurrSong = null; 
  nextVal = 0; 
  songId = null;
  songName = null; 



  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    //this.createBlankPlaylist(); 
  }


  searchSong() {
    this.spotifyService.spotifyApi.searchTracks(this.searchsongval).then((data) => {

        (document.getElementById("recentSearch") as HTMLImageElement).src = 'https://open.spotify.com/embed/track/' + data.body.tracks.items[0].id; 
        console.log('name? ', data.body.tracks.items[0]); 
        this.searchSongId = data.body.tracks.items[0].id; 
        this.searchSongName = data.body.tracks.items[0].name; 
        this.searchSongArtist = data.body.tracks.items[0].artists[0].name; 

        this.allDataCurrSong = data.body; 
        console.log('allDataCurrSong ', this.allDataCurrSong); 

        console.log('this.searchSongId ', this.searchSongId); 
        //this.addSongToPlaylist(this.searchSongId, this.searchSongName); 

        this.nextVal = 0; 

        this.getSongRec(this.searchSongId); 

    }, function(err) {
      console.log('Something went wrong in searchSong in playlist-builder.component'); 
    }); 
  }

  getSongRec(song) {
    // Get Recommendations Based on Seeds
    this.spotifyService.spotifyApi.getRecommendations({
      min_energy: 0.4,
      seed_artists: [song],
      min_popularity: 50
    }).then((data) => {
      let recommendations = data.body;
      console.log('recommendations ', recommendations);
      this.getArtistTopSong(recommendations); 
    }, function(err) {
      console.log("Something went wrong!", err);
    });
  }

  getArtistTopSong(recommendations) {
    console.log('recommendations.seeds[0].id ', recommendations.seeds[0].id); 
    //this.spotifyService.spotifyApi.getArtistTopTracks(recommendations.seeds[0].id, 'US').then(function(data) {
    this.spotifyService.spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'US').then(function(data) {
      console.log('top track! ', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

  nextSong() {
    console.log('in nextSong'); 
    this.nextVal = this.nextVal + 1; 
    if (this.nextVal >= 20) {
      console.log('no more songs!'); 
    } else {
      (document.getElementById("recentSearch") as HTMLImageElement).src = 'https://open.spotify.com/embed/track/' + this.allDataCurrSong.tracks.items[this.nextVal].id; 
      this.searchSongId = this.allDataCurrSong.tracks.items[this.nextVal].id; 
      this.searchSongName = this.allDataCurrSong.tracks.items[this.nextVal].name; 
      this.searchSongArtist = this.allDataCurrSong.tracks.items[this.nextVal].artists[0].name; 
      
    }
  }

   /* Update search query parameter */
  onSearchInput(event: any) {
    console.log(event.target.value); 
    this.searchsongval = event.target.value;
    console.log('this.searchsongval ', this.searchsongval); 
  }

  createBlankPlaylist() {
    // Create a private playlist
    this.spotifyService.spotifyApi.createPlaylist('My playlist', { 'description': 'My description', 'public': true }).then((data) => {
      console.log('Created playlist!', data.body);

      // set playlist id 
      this.playlistId = data.body.id; 
      console.log('this.playlistId ', this.playlistId); 


      // test add a default song to playlist 
      //this.addSongToPlaylist(); 
      //this.addSongToPlaylist('4iV5W9uYEdYUVa79Axb7Rh'); 

      (document.getElementById("currentPlaylist") as HTMLImageElement).src = 'https://open.spotify.com/embed/playlist/' + data.body.id; 

      console.log('this.playlistId ', this.playlistId); 

    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

  createPlaylist() {
    this.spotifyService.spotifyApi.createPlaylist('My playlist', { 'description': 'My description', 'public': true }).then((info) => {
      console.log('Created Playlist!', info.body); 

      this.playlistId = info.body.id; 
  
      console.log('this.playlistId ', this.playlistId); 

      console.log('this.playlistSongs ', this.playlistSongs); 
      
      let i; 
      var songString; 
      for(i = 0; i < this.playlistSongs.length; i ++) {
        //this.addSongToPlaylist(this.playlistSongs[i]); 
        songString = 'spotify:track:' + this.playlistSongs[i]; 
        this.spotifyService.spotifyApi.addTracksToPlaylist(this.playlistId, [songString]).then((data) => {
          console.log('Added track to playlist!'); 
        }, function (err) {
          console.log('Something went wrong!', err); 
        }); 
      }

      (document.getElementById("currentPlaylist") as HTMLImageElement).src = 'https://open.spotify.com/embed/playlist/' + this.playlistId;  
      

    }, function(err) {
      console.log('Something went wrong!', err); 
    }); 
  }



  testReload() {
    (document.getElementById("currentPlaylist") as HTMLImageElement).src = 'https://open.spotify.com/embed/playlist/' + '5ihS6UUlyQAfmp48eSkxuQ';  

    var songString = 'spotify:track:' + '5ihS6UUlyQAfmp48eSkxuQ'; 
    this.spotifyService.spotifyApi.addTracksToPlaylist('036B1xuAvJF7dxzD3cVh8h', [songString]).then((data) => {
      console.log('Added track to playlist!'); 
    }, function (err) {
      console.log('Something went wrong!', err); 
    }); 

    // get the element
    this.el = (document.getElementById("currentPlaylist") as HTMLImageElement); 
    this.el.contentDocument.location.reload(true); 
  }

  addSongToPlaylist() {
    console.log('in addSongToPlaylist'); 
    // Add tracks to a playlist
    /*
    var songString = 'spotify:track:' + songId; 
    console.log('songString ', songString); 
    console.log('this.playlistId ', this.playlistId); 
    this.spotifyService.spotifyApi.addTracksToPlaylist(this.playlistId, [songString]).then((data) => {
      console.log('Added tracks to playlist!');
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    */
    this.playlistSongs.push(this.searchSongId); 

    var displayString = this.searchSongName + ' by ' + this.searchSongArtist; 
    this.playlistSongNames.push(displayString); 
    console.log('this.playlistSongs ', this.playlistSongs); 
    console.log('this.playlistSongNames ', this.playlistSongNames); 

    //(document.getElementById("currentPlaylist") as HTMLImageElement).src = 'https://open.spotify.com/embed/playlist/' + '1oJXIJr4SIoSq31KLdfuDE'; 
    //(document.getElementById("currentPlaylist") as HTMLImageElement).src = 'https://open.spotify.com/embed/playlist/' + this.playlistId; 

  }


}