import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public http: HttpClient, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  /* Initialize component variables */
  isLoginMode = true;

  /* User chooses to switch modes */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /* User submits the authentication form */
  onSubmit(form: NgForm) {
    console.log(form.value);

    if (this.isLoginMode) {
      /* We are in login mode, call the login service function */
      this.spotifyService.login(form.value.email, form.value.password);
    } else {
      /* We are in sign up mode, call the createUser service function */
      this.spotifyService.createUser(form.value.email, form.value.password);
    }
    
    /* Reset the form */
    form.reset();
  }

}
