import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  public token: string;

  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(handle: string, password: string): Observable<boolean> {
    return this.http.post('/api/login', JSON.stringify({ handle: handle, password: password }), {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const responseJson = response.json();

        const responseHandle = responseJson.handle;
        const uid = responseJson.uid;
        const token = responseJson.token;

        if (! token) {
          return false;
        }

        return this.storeLogin(responseHandle, uid, token);

      });
  }

  /* Returns whether the login data was successfully stored */
  storeLogin(handle: string, uid: string, token: string) {
    const userJson = {handle, uid, token};
    localStorage.setItem('currentUser', JSON.stringify(userJson));
    return (!!localStorage.getItem('currentUser'));
  }

  /* Clears all of the local storage */
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {

    return (!! localStorage.getItem('currentUser'));
  }
}
