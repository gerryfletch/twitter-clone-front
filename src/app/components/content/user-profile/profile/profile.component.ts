import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RelationshipService} from 'app/_services/relationships/relationship.service';

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

  error: string;
  isError = false;

  tweetUser = false;

  constructor(private relationshipService: RelationshipService) { }

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
    this.relationshipService.followUser(this.handle)
      .subscribe(
        result => {
          this.isError = false;
          this.following = true;
          this.numberOfFollowers += 1;
        },
        error => {
          this.isError = true;
          this.error = error.json().error;
        }
      );
  }

  unfollow() {
    this.relationshipService.unfollowUser(this.handle)
      .subscribe(
        result => {
          this.isError = false;
          this.following = false;
          this.numberOfFollowers -= 1;
        },
        error => {
          this.isError = true;
          if (error.status === 500) {
            this.error = 'Woah there. Something went wrong on our end.';
          } else {
            this.error = error.json().error;
          }
        }
      )
  }

}
