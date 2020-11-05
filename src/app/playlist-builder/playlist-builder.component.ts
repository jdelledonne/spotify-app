import { Component, OnInit } from '@angular/core';
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



  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }


  searchSong() {
    this.spotifyService.spotifyApi.searchTracks(this.searchsongval).then(function(data) {
        //console.log('Search tracks by ', this.searchSong, ' in the track name and ', this.searchArtist, ' in the artist name', data.body); 
        console.log('Search tracks with ', data.body);
        console.log('testing ', data.body.tracks); 
        console.log('testing part 2 ', data.body.tracks.items[0]); 
        console.log('testing part 3 ', data.body.tracks.items[0].id); 
        (document.getElementById("recentSearch") as HTMLImageElement).src = 'https://open.spotify.com/embed/track/' + data.body.tracks.items[0].id; 

        //console.log('data.tracks.items[0].id ', data.body.tracks.items[0].id); 
        //var temp = data.body.tracks.items[0].id; 
        //this.recentSearchId = temp; 
    }, function(err) {
      console.log('Something went wrong in searchSong in playlist-builder.component'); 
    }); 
    
    this.createBlankPlaylist(); 
    //console.log('recentSearchId: ', this.recentSearchId); 
    //(document.getElementById("recentSearch") as HTMLImageElement).src = this.recentSearchBase + this.recentSearchId; 
  }

   /* Update search query parameter */
  onSearchInput(event: any) {
    console.log(event.target.value); 
    this.searchsongval = event.target.value;
    console.log('this.searchsongval ', this.searchsongval); 
  }

  createBlankPlaylist() {
    // Create a private playlist
    this.spotifyService.spotifyApi.createPlaylist('My playlist', { 'description': 'My description', 'public': true }).then(function(data) {
      console.log('Created playlist!', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

}


/*
// THIS IS COPIED FROM THE SEARCH ARTIST COMPONENT
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent implements OnInit {

  // Initialize component variables 
  history = this.spotifyService.history;
  searchartist = 'Default artist'; 
  dataUrl = "src/app/data.json";
  popPlaylistUrlBase = "https://open.spotify.com/embed/playlist/"; 
  artists = [];  

  // Initialize dynamic function variables 
  us_top_50     = null;
  usTop         = null; 
  globalTop     = null; 
  globalViral   = null; 
  values        = null; 
  idResults     = null; 

  constructor(public http: HttpClient, private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    console.log("in search artist ngOnInit"); 
  }

  onSearchArtist() {
    
  }

  getPopData() {
    console.log('start of getPopData')
    return this.http.get(this.dataUrl); 
  }

  // Search for an artist 
  searchArtist() {
    this.spotifyService.getArtistByName(this.searchartist).subscribe((data: any) => {
      this.artists = data; 
      console.log(this.artists['artists']['items']['0']); 
      this.history.push(this.artists['artists']['items']['0']);
      console.log(this.artists);
    }); 
  }

  // Pull playlist information from Parse database 
  loadPopPlaylists() {
    this.values = this.spotifyService.getAllPlaylists().then((results) => {
      console.log('results', results); 
      console.log(results[0]['attributes']['spotifyId']); 
      this.idResults = results; 

      let i; 
      for (i = 0; i < this.idResults.length; i ++) {
        (document.getElementById(this.idResults[i]['attributes']['name']) as HTMLImageElement).src = this.popPlaylistUrlBase + this.idResults[i]['attributes']['spotifyId']; 
      }
    }); 
  }

  // Update search query parameter 
  onSearchInput(event: any) {
    this.searchartist = event.target.value;
  }

  // Function that navigates to the popular playslists route 
  onGotoPlaylists() {
    this.router.navigate(['/popularPlaylists']);
  }

}
*/