import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';

@Injectable()
export class RelationshipService {

  constructor(private authHttp: AuthHttp) {
  }

  followUser(handle: string) {
    const url = '/api/user/' + handle + '/follow';
    return this.authHttp.post(url, '');
  }

  unfollowUser(handle: string) {
    const url = '/api/user/' + handle + '/unfollow';
    return this.authHttp.post(url, '');
  }

}
