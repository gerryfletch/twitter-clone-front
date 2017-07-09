import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class PostTweetService {

  constructor(private authHttp: AuthHttp) { }

  newTweet(body: string) {
    const url = 'api/tweet/new';
    const json = {body: body};
    this.authHttp.post(url, json)
      .subscribe(
        result => console.log(result),
        error => console.log(error)
      );
  }

}
