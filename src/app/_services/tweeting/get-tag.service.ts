import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Rx';
import {UsersArray} from '../../_model/user-model';

@Injectable()
export class GetTagService {

  constructor(private authHttp: AuthHttp) { }

  getTags(handle: string): Observable<UsersArray> {
    const apiURL = 'api/tweet/tags';
    const request = {'tag': handle};

    return this.authHttp.post(apiURL, request)
      .map(res => res.json() as UsersArray)
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

}
