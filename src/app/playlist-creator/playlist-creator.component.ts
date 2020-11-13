import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { SpotifyService } from '../services/spotify.service';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';



@Component({
  selector: 'app-playlist-creator',
  templateUrl: './playlist-creator.component.html',
  styleUrls: ['./playlist-creator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlaylistCreatorComponent implements OnInit {

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
  playlistName = "My Playlist";
  playlistDescription = "My Description"; 
  inputTypeItems: any[] = [
    { id: 1, name: 'Search by Song Name '},
    { id: 2, name: 'Search by Artist Name '}
  ];
  selected: number = 1; 
  currInputType = 1; 
  playlistLink = null; 
  playlistLinkSafe = null; 
  display_playlist = true; 



  constructor(private spotifyService: SpotifyService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }


  searchSong() {
    var searchval; 
    if (this.currInputType == 1) {
      searchval = this.searchsongval; 
    } else {
      searchval = 'artist:' + this.searchsongval; 
    }

    console.log('this.currInputType: ', this.currInputType, ' searchval: ', searchval); 
    
    this.spotifyService.spotifyApi.searchTracks(this.searchsongval).then((data) => {
        var inputType = (document.getElementById("inputType") as HTMLImageElement);
        console.log("inputType val ", inputType);  
        

        (document.getElementById("recentSearch") as HTMLImageElement).src = 'https://open.spotify.com/embed/track/' + data.body.tracks.items[0].id; 
        console.log('name? ', data.body.tracks.items[0]); 
        this.searchSongId = data.body.tracks.items[0].id; 
        this.searchSongName = data.body.tracks.items[0].name; 
        this.searchSongArtist = data.body.tracks.items[0].artists[0].name; 

        this.allDataCurrSong = data.body; 
        console.log('allDataCurrSong ', this.allDataCurrSong); 

        console.log('this.searchSongId ', this.searchSongId); 

        this.nextVal = 0; 

        this.getSongRec(this.searchSongId); 

    }, function(err) {
      console.log('Something went wrong in searchSong in playlist-creator.component'); 
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

  selectOption(id: number) {
      console.log('next two outputs from selected'); 
      console.log(id); 
      console.log(this.selected); 
      this.currInputType=id; 
  }
  

  getArtistTopSong(recommendations) {
    console.log('recommendations.seeds[0].id ', recommendations.seeds[0].id); 
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
      console.log('no songs that way!'); 
      this.nextVal = 20; 
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

  onPlaylistNameInput(event: any) {
    this.playlistName = event.target.value; 
    console.log('this.playlistName ', this.playlistName); 
  }

  onPlaylistDescriptionInput(event: any) {
    this.playlistDescription = event.target.value; 
    console.log('this.playlistDescription ', this.playlistDescription); 
  }

  createPlaylist() {
    this.spotifyService.spotifyApi.createPlaylist(this.playlistName, { 'description': this.playlistDescription, 'public': true }).then((info) => {
      console.log('Created Playlist!', info.body); 

      this.playlistId = info.body.id; 
  
      console.log('this.playlistId ', this.playlistId); 

      console.log('this.playlistSongs ', this.playlistSongs); 

      this.playlistLink = "https://open.spotify.com/embed/playlist/" + info.body.id; 
      this.playlistLinkSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistLink); 
      (document.getElementById("currentPlaylist") as HTMLImageElement).src = 'https://open.spotify.com/embed/playlist/' + info.body.id;  
      return this.playlistId; 

    }, function(err) {
      console.log('Something went wrong!', err); 
    }).then((playlistId) => {

      this.fillPlaylist(); 

    }).catch(function(error){
      console.error(error); 
    }); 

  }

  fillPlaylist() {
    console.log('in fillPlaylist ', this.playlistSongs); 
    let i; 
    for(i = 0; i < this.playlistSongs.length; i ++) {
      this.addSongToCreatedPlaylist(this.playlistSongs[i]); 
    }
  }

  addSongToCreatedPlaylist(songId: string) {
    var songString = 'spotify:track:' + songId; 
    this.spotifyService.spotifyApi.addTracksToPlaylist(this.playlistId, [songString]).then((data) => {
      console.log('Added ', songId, ' to playlist!'); 
    }, function(err) {
      console.log('Failed to load ', songId, ' to playlist!'); 
    }); 

  }



  addSongToPlaylist() {
    console.log('in addSongToPlaylist'); 

    this.playlistSongs.push(this.searchSongId); 

    var displayString = this.searchSongName + ' by ' + this.searchSongArtist; 
    this.playlistSongNames.push(displayString); 

    console.log('this.searchSongId ', this.searchSongId);
    console.log('this.searchSongName ', this.searchSongName); 


  }


}