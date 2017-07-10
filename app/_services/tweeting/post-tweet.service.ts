import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import {Tweet} from '../../_model/tweet-model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostTweetService {

  constructor(private authHttp: AuthHttp) { }

  /*
    Posts a tweet, returning the newly created tweet
    to be pushed onto the feed.
   */
  newTweet(body: string): Observable<Tweet> {
    const url = 'api/tweet/new';
    const json = {body: body};
    return this.authHttp.post(url, json)
      .map(res =>  res.json() as Tweet)
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

}
