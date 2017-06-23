import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserUtilsService {
  constructor(private http: Http) { }

  doesHandleExist(handle: string): Observable<Response> {
    const url = 'api/user/' + handle;

    return this.http.head(url);
  }

}
