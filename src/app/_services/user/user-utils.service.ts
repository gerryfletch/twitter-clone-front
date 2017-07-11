import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class UserUtilsService {
  constructor(private http: Http,
              private authHttp: AuthHttp) {
  }

  doesHandleExist(handle: string): Observable<Response> {
    const url = 'api/user/' + handle;

    return this.http.head(url);
  }

  isCurrentUserHandle(handle: string) {
    const url = 'api/user/' + handle + '/edit';
    return this.authHttp.head(url);
  }

}
