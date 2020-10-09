import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

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
    form.reset();
  }

}
