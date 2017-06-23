import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class VerificationService {

  constructor(private http: Http) { }

  isHandleValid(handle: string) {
    if (handle === '') {
      return true;
    }

    if (handle.length < 3 || handle.length > 15) {
      return false;
    }

    if (handle.indexOf(' ') > 0) {
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
      } else if (this.charIsAlphaNumeric(currentChar)) {
        isSpecialChar = false;
      } else {
        return false; /* Any non-alphanumeric or -/_ character */
      }
    }

    return true;
  }

  isDisplayNameValid(displayName: string) {
    if (displayName === '') { return true; }
    return !(displayName.length < 3 || displayName.length > 15);
  }

  isEmailValid(email: string) {
    if (email === '') { return true; }
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  /* Passwords must:
   1) Contain one digit from 0-9
   2) Contain one lowercase character
   3) Contain one uppercase character
   4) Be at least 8 characters  long, and less than 20
   */
  isPasswordValid(password: string) {
    if (password === '') { return true; }
    const pattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/;
    return pattern.test(password);
  }

  private charIsAlphaNumeric(char: string) {
    const pattern = /[a-zA-Z0-9]/;
    const ans = pattern.test(char);

    return ans;
  }


}
