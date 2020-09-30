import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer BQBWXubZhJnc8uRbNgr46teB0hy6Vl16V0vsbFRHpLq4XGukYHN6wtMd_rPewJhgzK8PU9X6-UUNpJWaTJOWVm_fDN6L6d3CB8-YfiXSeNpAlR44KcCPY3MuOkbikUZkm8qJD0igubO1r4iCpw'
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
