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

  constructor(private router: Router, private spotifyService: SpotifyService) { 
    this.spotifyService.userLoggedIn.subscribe(
      (new_user: any) => {
        console.log(new_user);
        this.user = new_user;
        this.username = new_user.get('username');
        this.isLoggedIn = true;
      }
    )
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
    this.isLoggedIn = false;
    this.user = null;
    this.gotoAuthentication();
  }

}
