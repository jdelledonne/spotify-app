import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  /* Inherited objects from app component */
  temp: any;
  @Input() user: string;
  @Input() isLoggedIn: boolean;

  constructor(private router: Router, public http: HttpClient, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  /* Initialize component variables */
  isLoginMode = true;
  createdUser = false;

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
      console.log("after login...");
      //this.router.navigate(['/']);
      console.log("attempted navigation...");
    } else {
      /* We are in sign up mode, call the createUser service function */
      this.spotifyService.createUser(form.value.email, form.value.password);
      this.createdUser = true;
    }
    
    /* Reset the form */
    form.reset();
  }

}
