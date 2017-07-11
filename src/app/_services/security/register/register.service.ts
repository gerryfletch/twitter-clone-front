import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http
  ) { }

  registerNewUser(handle: string, displayName: string, email: string, password: string): Observable<any> {
    const url = 'api/register';

    const userJson = {
      handle,
      displayName,
      email,
      password
    }

    return this.http.post(url, userJson, {headers: this.headers});

  }

}
