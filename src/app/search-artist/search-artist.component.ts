import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css']
})
export class SearchArtistComponent implements OnInit {

  /* Initialize component variables */
  history = this.spotifyService.history;
  searchartist = 'Default artist'; 
  dataUrl = "src/app/data.json";
  popPlaylistUrlBase = "https://open.spotify.com/embed/playlist/"; 
  artists = [];  

  /* Initialize dynamic function variables */
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

  /* Search for an artist */
  searchArtist() {
    this.spotifyService.getArtistByName(this.searchartist).subscribe((data: any) => {
      this.artists = data; 
      console.log(this.artists['artists']['items']['0']); 
      this.history.push(this.artists['artists']['items']['0']);
      console.log(this.artists);
    }); 
  }

  /* Pull playlist information from Parse database */
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

  /* Update search query parameter */
  onSearchInput(event: any) {
    this.searchartist = event.target.value;
  }

  /* Function that navigates to the popular playslists route */
  onGotoPlaylists() {
    this.router.navigate(['/popularPlaylists']);
  }

}
