import { Component, OnInit } from '@angular/core';
import {FeedService} from '../../_services/tweeting/feed/feed.service';
import {ActivatedRoute} from '@angular/router';
import {Tweet} from '../../_model/tweet-model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-perma-tweet',
  templateUrl: './perma-tweet.component.html',
  styleUrls: ['./perma-tweet.component.scss'],
  providers: [FeedService]
})
export class PermaTweetComponent implements OnInit {

  isValid = true;
  error = '';
  tweet: Tweet;

  constructor(
    private feedService: FeedService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const hashid = params['hashid'];

      this.feedService.getTweet(hashid)
        .subscribe(
          tweet => {
            this.tweet = tweet;
            console.log(tweet);
          },
          error => {
            this.isValid = false;
            if (error.status === 404) {
              this.error = 'Oops. We can\'t find this tweet...';
            } else {
              this.error = 'Something went wrong on our end. Sorry about that.';
            }
          }
        )

    });
  }

  backClick() {
    this._location.back();
  }

}
