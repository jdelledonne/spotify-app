import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* Initialize variables */
  title = 'Spotify-Helper';

  constructor(private router: Router, public spotifyService: SpotifyService) { 

    /* Subscribe to recieve updates about user logins */
    this.spotifyService.userLoggedIn.subscribe(
      (new_user: any) => {
        console.log(new_user);
        this.spotifyService.user = new_user;
        this.spotifyService.username = new_user.get('username');
        this.spotifyService.isLoggedIn = true;
      }
    )

    /* Subscribe to receive updates on whether a token has been received */
    this.spotifyService.receivedToken.subscribe(
      () => {
        this.spotifyService.isSpotifyAuthenticated = true;
        this.router.navigate(['/auth']);
      }
    )

    /* Navigate automatically to the auth page */
    //this.gotoAuthentication();

  }

  spotifyLogin() {
    this.spotifyService.linkSpotify();
  }

  /* navigate to authentication page */
  gotoAuthentication() {
    this.router.navigate(['/auth']);
  }

  /* logout current user */
  logout() {
    // Parse logout user code goes here
    console.log("logging out ", this.spotifyService.user);
    this.spotifyService.current_user = null;
    this.spotifyService.history = [];
    this.spotifyService.isLoggedIn = false;
    this.spotifyService.user = null;
    this.gotoAuthentication();
  }

}
