import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class UserProfileService {

  private userAPI = 'api/profile/';

  constructor(
    private authHttp: AuthHttp
  ) { }

  getUserProfile(handle: string) {
    const href = this.userAPI + handle;
    return this.authHttp.get(href);
  }

  updateUserProfile(json, handle) {
    const href = this.userAPI + handle;
    return this.authHttp.put(href, json);
  }

}
