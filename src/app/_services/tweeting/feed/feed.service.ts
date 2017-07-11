import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Observable';
import {Tweet} from '../../../_model/tweet-model';

@Injectable()
export class FeedService {

  constructor(
    private authHttp: AuthHttp
  ) { }

  getFeed(): Observable<Tweet[]> {
    const url = 'api/feed/?limit=10&page=0';
    return this.authHttp.get(url)
      .map(res => res.json() as Tweet[]);
  }

  getUserFeed(handle: string): Observable<Tweet[]> {
    const url = 'api/feed/?limit=10&page=0&handle=' + handle;
    return this.authHttp.get(url)
      .map(res => res.json() as Tweet[]);
  }

  getTweet(hashid: string): Observable<Tweet> {
    const url = 'api/tweet/' + hashid;
    return this.authHttp.get(url)
      .map(res => res.json() as Tweet);
  }

}
