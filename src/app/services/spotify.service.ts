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

  /* Create a new user */
  public createUser(email: string, password: string) {
    const user = new Parse.User()
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);

    user.signUp().then((user: any) => {
      if (typeof document !== 'undefined') {
        console.log(`Successful sign up: ${JSON.stringify(user)}`);
      }
      console.log('User signed up: ', user);
    }).catch(error => {
      if (typeof document !== 'undefined') console.log(`Error while signing up user: ${JSON.stringify(error)}`);
      console.error('Error while signing up user: ', error);
    });
  }

  /* Login a user */
  public login(email: string, password: string) {
    Parse.User.logIn(email, password).then((user: any) => {
      /* Successful login */
      if (typeof document !== 'undefined') { 
        console.log(`Successful login: ${JSON.stringify(user)}`);
      }
      console.log('Logged in user: ', user);
    }).catch(error => {
      /* Error logging in */
      if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
      console.error('Error while logging in user: ', error);
    });
  }

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
      'Authorization': 'Bearer BQCXQncguPckXImfWQXNhV3ZzGNt9pDlOT5-00MmBFzjtmjLGqLbui_CiQQfyR47clNUQ2Xi6gRAvnuxNG-NLqn4D3G1Mv-7RJ49K4XA0acsPfx8Hs-ghEqOe74Yd1mPwUvpMiScJ9ARzr6dzVW6Lw'
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
