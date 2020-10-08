import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as Parse from 'parse'; 

Parse.serverURL = 'https://parseapi.back4app.com'; 
Parse.initialize(
  'E33O0InrCwBjYDrYgxoWy1oN8LLLnQQgNOEESrnE',
  'GC5CAPOaC1qTCmWTWsXS5JXlp0uBOgUty8wl9H1D'
); 

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private readonly databaseEndpoint = 'defaultPlaylist'; 

  constructor(private http: HttpClient) { }

  public getAllPlaylists() {
    var temp = Parse.Object.extend(this.databaseEndpoint); 
    var query = new Parse.Query(temp); 
    return query.find(); 
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer BQD1Vtjkrj4AGOuFhH1HQZdIi85K20uPBBXUOInWahczogmHDKQp10HEN8kp8PCbyjMk2PXwHTohIJ-4Go_HrXg23tctiP28v-9K7SoHlVk4ITvrVmqtTFPgdk2zeNckJR6KYbZZYFdP3QLTuydMRA'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map(data => data["albums"].items)
    );
  }

  getArtists(term: string) {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  // this is me
  getArtistByName(name: string) {
      return this.getQuery(`search?q=$${name}&type=artist`);
  }

  getTopTracks(idArtist: string) {
    return this.getQuery(`artists/${idArtist}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));

  }
}
