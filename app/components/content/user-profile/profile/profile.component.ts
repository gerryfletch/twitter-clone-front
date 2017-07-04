import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input('handle') handle: string;
  @Input('profile') profile: any;

  displayName: string;
  profilePicture: string;
  bio: string;

  numberOfTweets: number;
  numberOfFollowers: number;
  numberOfFollowing: number;

  self: boolean;
  following: boolean;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {

    const profile = this.profile;

    this.displayName = profile.display_name;
    this.profilePicture = profile.profile_picture;

    if (profile.profile_picture === null) {
      this.profilePicture = 'assets/image/default-profile-picture.svg';
    } else {
      this.profilePicture = profile.profile_picture;
    }

    if (profile.bio === null) {
      this.bio = 'This user doesn\'t have a bio.';
    } else {
      this.bio = profile.bio;
    }

    const statistics = profile.statistics;
    this.numberOfTweets = statistics.number_of_tweets;
    this.numberOfFollowers = statistics.number_of_followers;
    this.numberOfFollowing = statistics.number_of_following;

    const relationship = profile.relationship;
    this.following = relationship.following;

    this.self = profile.self;

  }

  follow() {

  }

}
