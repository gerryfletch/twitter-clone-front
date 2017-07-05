import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class GetTagService {

  constructor(private authHttp: AuthHttp) { }

  getTag(handle: string) {
    const apiURL = 'api/tweet/get/tags';
    const request = {'tag': handle};

    return this.authHttp.post(apiURL, request);
  }

}
