import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../services/spotify.service'

@Component({
  selector: 'app-popular-playlists',
  templateUrl: './popular-playlists.component.html',
  styleUrls: ['./popular-playlists.component.css']
})
export class PopularPlaylistsComponent implements OnInit {

  /* Initialize component variables */
  values: any;
  idResults: any;
  popPlaylistUrlBase = "https://open.spotify.com/embed/playlist/";

  /* Component constructor */
  constructor(public http: HttpClient, private spotifyService: SpotifyService) { }

  /* On Init function */
  ngOnInit(): void {
    console.log("in popular-playlists ngOnInit"); 
    this.loadPopPlaylists(); 
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

}
