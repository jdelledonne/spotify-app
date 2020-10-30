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
  isLoggedIn = false;
  username = null;
  user = null;
  isSpotifyAuthenticated = false;

  constructor(private router: Router, private spotifyService: SpotifyService) { 

    /* Subscribe to recieve updates about user logins */
    this.spotifyService.userLoggedIn.subscribe(
      (new_user: any) => {
        console.log(new_user);
        this.user = new_user;
        this.username = new_user.get('username');
        this.isLoggedIn = true;
      }
    )

    /* Subscribe to receive updates on whether a token has been received */
    this.spotifyService.receivedToken.subscribe(
      () => {
        this.isSpotifyAuthenticated = true;
        this.router.navigate(['/']);
      }
    )

    /* Navigate automatically to the auth page */
    //this.gotoAuthentication();

  }

  /* navigate to authentication page */
  gotoAuthentication() {
    this.router.navigate(['/auth']);
  }

  /* logout current user */
  logout() {
    // Parse logout user code goes here
    console.log("logging out ", this.user);
    this.spotifyService.current_user = null;
    this.spotifyService.history = [];
    this.isLoggedIn = false;
    this.user = null;
    this.gotoAuthentication();
  }

}
