import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Entities, Profile, Tweet} from '../../../_model/tweet-model';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input() tweet: Tweet;
  profile: Profile;
  entities: Entities;

  @ViewChild('tweetbody') tweetbody: ElementRef;

  constructor() { }

  ngOnInit() {
    this.profile = this.tweet.profile;
    this.entities = this.tweet.entities;
    this.formatUserMentions();

    this.tweet.timestamp = prettyDate(this.tweet.timestamp);

    const profilePicture = this.profile.profile_picture;

    if(profilePicture === null) {
      this.profile.profile_picture = 'assets/image/default-profile-picture.svg';
    }

  }

  formatUserMentions() {
    const userMentions = this.entities.user_mentions;
    let body = this.tweet.body;

    if (userMentions.length > 0) {
      for(let i = userMentions.length - 1; i >= 0; i--) {
        const mention = userMentions[i];
        const start = mention.indices[0] - 1;
        const end = mention.  indices[1];
        const handle = mention.handle;

        // const href = '<a [routerLink]="[\'/user/' + handle + '\']" >@' + handle + '</a>';
        const href2 = '<a href="/user/' + handle + '">@' + handle + '</a>';

        body = body.substring(0, start) + href2 + body.substring(end);

      }
    }

    this.tweet.body = body;
    this.tweetbody.nativeElement.innerHTML = body;
  }

}

function prettyDate(time){
  let date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
    diff = (((new Date()).getTime() - date.getTime()) / 1000),
    day_diff = Math.floor(diff / 86400);

  if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
    return;

  return day_diff == 0 && (
    diff < 60 && "just now" ||
    diff < 120 && "1 minute ago" ||
    diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
    diff < 7200 && "1 hour ago" ||
    diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}
