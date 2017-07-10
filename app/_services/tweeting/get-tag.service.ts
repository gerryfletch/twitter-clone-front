import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import {User} from '../../_model/user';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GetTagService {

  constructor(private authHttp: AuthHttp) { }

  getTags(handle: string): Observable<User[]> {
    const apiURL = 'api/tweet/get/tags';
    const request = {'tag': handle};

    return this.authHttp.post(apiURL, request)
      .map(res => res.json().users)
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

}
