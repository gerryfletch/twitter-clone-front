import {Component, Input, OnInit} from '@angular/core';
import {Tweet} from '../../_model/tweet-model';
import {FeedService} from '../../_services/tweeting/feed/feed.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [FeedService]
})
export class FeedComponent implements OnInit {

  tweets: Tweet[] = [];
  @Input() handle: string;

  serverError: boolean = false;

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit() {
    if (this.handle === null) {
      this.feedService.getFeed()
        .subscribe(
          res => this.tweets = res,
          error => {
            console.log(error);
            this.serverError = true;
          }
        );
    } else {
      this.feedService.getUserFeed(this.handle)
        .subscribe (
          res => this.tweets = res,
          error => {
            console.log(error);
            this.serverError = true;
          }
        );
    }

  }

}
