import {Component, NgModule, trigger, transition, style, animate, state} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'



@Component({
  selector: 'app-signup-comp',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss',
    '../../partials/_buttons.scss'
  ],
  animations: [
    trigger('showHideText', [
      state('in', style({height: '0'})),
      transition('void => *', [
        style({height: '0'}),
        animate(250, style({height: '*'}))
      ]),
      state('out', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: '0'}))
      ])
    ])
  ]
})
export class SignupComponent {

  isFocused: boolean;
  isError: boolean;

  handle: string;
  isHandleOk = true;

  displayName: string;
  isDisplayOk = true;

  email: string;
  isEmailOk = true;

  password: string;
  isPasswordOk = true;

  handleFocused() {
    if (this.isHandleOk) {
      this.isFocused = true;
      this.isError = false;
    } else {
      this.isFocused = false;
      this.isError = true;
    }
  }

  handleUnfocused() {
    this.isFocused = false;
    if (this.isHandleOk) {
      this.isError = false;
    } else {
      this.isError = true;
    }
  }

  checkHandle() {
    this.handle = this.handle.toLowerCase();
    const handle = this.handle;

    if (handle === '') {
      this.isHandleOk = true;
      this.handleFocused();
      return;
    }

    if (isHandleValid(handle)) {
      this.isHandleOk = true;
    } else {
      this.isHandleOk = false;
    }

    this.handleFocused();
  }

  checkDisplay() {
    const displayName = this.displayName;
    // If it is empty, reset
    if (displayName === '') { this.isDisplayOk = true; return }

    if (this.displayName.length < 3 || this.displayName.length > 15) {
      this.isDisplayOk = false;
      return;
    }
    this.isDisplayOk = true;
    return;
  }

  checkEmail() {
    const email = this.email;
    if (email === '') { this.isEmailOk = true; return }

    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      this.isEmailOk = true;
    } else {
      this.isEmailOk = false;
    }
  }

  /* Passwords must:
   1) Contain one digit from 0-9
   2) Contain one lowercase character
   3) Contain one uppercase character
   4) Be at least 8 characters long, and less than 20
   */
  checkPassword() {
    const password = this.password;
    if (password === '') { this.isPasswordOk = true; return }

    /*

     */
    const pattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/;
    if (pattern.test(password)) {
      this.isPasswordOk = true;
    } else {
      this.isPasswordOk = false;
    }
  }

  showPasswordText = false;

  showText() {
    this.showPasswordText = true;
  }

  hideText() {
    this.showPasswordText = false;
  }
}

const isHandleValid = (handle) => {
  if (handle.length < 3 || handle.length > 15) {
    return false;
  }

  let isSpecialChar = false;

  for (let i = 0; i < handle.length; i++) {
    const currentChar = handle.charAt(i);
    if (currentChar === '-' || currentChar === '_') {
      if (isSpecialChar) {
        return false;
      } else {
        isSpecialChar = true;
      }
    } else if (charIsAlphaNumeric(currentChar)) {
      isSpecialChar = false;
    } else {
      return false; /* Any non-alphanumeric or -/_ character */
    }
  }

  return true;
}

const charIsAlphaNumeric = (char: string) => {
  const pattern = /[a-zA-Z0-9]/;
  const ans = pattern.test(char);

  return ans;
}
