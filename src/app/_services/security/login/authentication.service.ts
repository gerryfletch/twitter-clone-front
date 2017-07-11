import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  public token: string;

  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {
    // set token if saved in local storage
    this.token = localStorage.getItem('token');
  }

  login(handle: string, password: string): Observable<boolean> {
    return this.http.post('/api/login', JSON.stringify({ handle: handle, password: password }), {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const responseJson = response.json();
        const token = responseJson.token;

        if (! token) {
          return false;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('handle', handle);
        return tokenNotExpired();

      });
  }

  /* Clears all of the local storage */
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return tokenNotExpired();
  }
}
