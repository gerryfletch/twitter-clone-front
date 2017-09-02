import {Component, Input} from '@angular/core';
import {Tweet} from '../../_model/tweet-model';
import {FeedService} from '../../_services/tweeting/feed/feed.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [FeedService]
})
export class FeedComponent {

  tweets: Tweet[] = [];
  serverError: boolean = false;

  constructor(
    private feedService: FeedService
  ) { }

  @Input() set handle(handle: string) {
    if (handle == null) {
      this.feedService.getFeed()
        .subscribe(
          tweets => {this.tweets = tweets; this.serverError = false},
          error => this.serverError = true
        )
    } else {
      this.feedService.getUserFeed(handle)
        .subscribe(
          tweets => {this.tweets = tweets; this.serverError = false},
          error => this.serverError = true
        )
    }
  };

}
