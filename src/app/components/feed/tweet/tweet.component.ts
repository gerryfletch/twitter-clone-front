import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Entities, Profile, Tweet} from '../../../_model/tweet-model';
import {TweetService} from '../../../_services/tweeting/tweet.service';
import {DateService} from '../../../_services/date.service';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
  providers: [TweetService, DateService]
})
export class TweetComponent implements OnInit {

  @Input() tweet: Tweet;
  profile: Profile;
  entities: Entities;

  @ViewChild('tweetbody') tweetbody: ElementRef;

  constructor(private _tweetService: TweetService,
              private _dateService: DateService) {
  }

  ngOnInit() {
    this.profile = this.tweet.profile;
    this.entities = this.tweet.entities;
    this.formatUserMentions();
    this.tweet.timestamp = DateService.prettyDate(this.tweet.timestamp);

    const profilePicture = this.profile.profile_picture;

    if (profilePicture === null) {
      this.profile.profile_picture = 'assets/image/default-profile-picture.svg';
    }

  }

  formatUserMentions() {
    const userMentions = this.entities.user_mentions;
    let body = this.tweet.body;

    if (userMentions.length > 0) {
      for (let i = userMentions.length - 1; i >= 0; i--) {
        const mention = userMentions[i];
        const start = mention.indices[0] - 1;
        const end = mention.indices[1];
        const handle = mention.handle;

        // const href = '<a [routerLink]="[\'/user/' + handle + '\']" >@' + handle + '</a>';
        const href2 = '<a href="/user/' + handle + '">@' + handle + '</a>';

        body = body.substring(0, start) + href2 + body.substring(end);

      }
    }

    this.tweet.body = body;
    this.tweetbody.nativeElement.innerHTML = body;
  }

  /**
   * Sets the colour of the like symbol instantly, but reverts it if the request fails.
   */
  likePost() {
    if (this.tweet.liked) {

      this.tweet.liked = false;
      this.tweet.like_count--;

      this._tweetService.unlikePost(this.tweet.hash_id)
        .subscribe(
          ok => this.tweet.liked = false,
          error => {
            this.tweet.liked = true;
            this.tweet.like_count++;
          }
        );
    } else {

      this.tweet.liked = true;
      this.tweet.like_count++;
      this._tweetService.likePost(this.tweet.hash_id)
        .subscribe(
          ok => true,
          error => {
            this.tweet.liked = false;
            this.tweet.like_count--;
          }
        );
    }
  }

}
