import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  history = [];
  testString = 'Hello there'; 
  initTester = 'Original';
  searchartist = 'Default artist'; 
  data; 
  us_top_50; 
  dataUrl = "src/app/data.json"; // ../../data.json?
  artists: any[] = [];  

  constructor(public http: HttpClient, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    /*
    this.data = this.getPopData().subscribe(data => {
      console.log(data); 
    }); 
    */
  }

  onSearchArtist() {
    this.testString = 'HELLOOOO THERE!!!!'; 
  }

  getPopData() {
    console.log('start of getPopData')
    return this.http.get(this.dataUrl); 
  }

  searchArtist() {
    this.spotifyService.getArtistByName(this.searchartist).subscribe((data: any) => {
      this.artists = data; 
      console.log(this.artists['artists']['items']['0']); 
      this.history.push(this.artists['artists']['items']['0']);
      console.log(this.artists);
    }); 
  }

  onSearchInput(event: any) {
    this.searchartist = event.target.value;
  }


}
