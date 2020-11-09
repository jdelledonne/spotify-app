import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as Parse from 'parse'; 
import { Router } from '@angular/router';
declare var require: any; 
var SpotifyWebApi = require('spotify-web-api-node');

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

  isLoggedIn = false;
  username = null;
  user = null;
  isSpotifyAuthenticated = false;

  userLoggedIn = new EventEmitter<any>();
  current_user = null;
  history = [];
  receivedToken = new EventEmitter<any>();
  token = null;

  songAdded = new EventEmitter<any>();
  songRemoved = new EventEmitter<any>();

  HubPlaylists = [];

  spotifyApi = new SpotifyWebApi({
    clientId: '45ac1879f9d14dafb67829763149c11e',
    clientSecret: 'db68de0d2e6c48a4b2ee32732e083253',
    redirectUri: 'http://localhost:4200/'
  });

  constructor(private http: HttpClient, private router: Router) { }

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
  public login(email: string, password: string): any {
    Parse.User.logIn(email, password).then((user: any) => {
      /* Successful login */
      if (typeof document !== 'undefined') { 
        console.log(`Successful login: ${JSON.stringify(user)}`);
      }
      console.log('Logged in user: ', user);
      this.userLoggedIn.emit(user);
      this.current_user = user;
      this.router.navigate(['/']);
    }).catch(error => {
      /* Error logging in */
      if (typeof document !== 'undefined') console.log(`Error while logging in user: ${JSON.stringify(error)}`);
      console.error('Error while logging in user: ', error);
    });
  }

  /* logout a user */
  public logout(email: string, password: string): any {
    // logout a user
    // remember to set this.current_user to null here so that the routes are protected again
    this.history = [];
  } 

  /* Add playlist to list of hub playlists */
  public publishHubPlaylist(playlist_id: string) {
    const hubPlaylist = Parse.Object.extend('hubPlaylist');
    const newHubPlaylist = new hubPlaylist();

    newHubPlaylist.set('playlist_id', playlist_id);

    newHubPlaylist.save().then(
      (result) => {
        console.log('hubPlaylist created', result);
      },
      (error) => {
        console.error('Error while creating hubPlaylist: ', error);
      }
    ).then(() => {
      this.HubPlaylists = [];
      this.loadAllHubPlaylists();
    });
  }

  /* Read the published playlists */
  public loadAllHubPlaylists() {
    const hubPlaylist = Parse.Object.extend('hubPlaylist');
    const query = new Parse.Query(hubPlaylist);
    query.find().then((results) => {
      console.log('hubPlaylist found', results);
      for (let i = 0; i < results.length; i++) {
        console.log(i + ": " + results[i].get("playlist_id"));
        this.HubPlaylists.push(results[i].get("playlist_id"));
      }
    }, (error) => {
      console.error('Error while fetching hubPlaylist', error);
    });
  }

  /* Allow a user to login to spotify account */
  public linkSpotify() {
    window.location.href="https://accounts.spotify.com/authorize?client_id=45ac1879f9d14dafb67829763149c11e&redirect_uri=http://localhost:4200/&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&response_type=token&state=123&user-library-modify";
  }

  public updateToken(t: string) {
    this.token = t;
    this.receivedToken.emit();
    console.log("Spotify Service: token updated: " + this.token);
  }

  // include spotify web api node
  public getSpotifyNode() {
    this.spotifyApi.setAccessToken(this.token); 
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
      'Authorization': 'Bearer ' + this.token
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