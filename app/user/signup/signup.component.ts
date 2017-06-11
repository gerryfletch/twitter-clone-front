import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss',
    '../../partials/_buttons.scss'
  ]
})
export class SignupComponent {
  ngOnInit() {
    console.log(localStorage);
  }

  signout() {
    localStorage.clear();
    console.log('local storage cleared');
  }
}
