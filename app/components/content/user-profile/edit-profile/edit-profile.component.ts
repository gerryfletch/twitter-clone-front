import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from '../../../../_services/user/user-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [UserProfileService]
})
export class EditProfileComponent implements OnInit {

  private sub: any;

  doesUserExist = true;

  handle: string;
  profile: any;

  displayName: string;
  profilePicture: string;
  bio: string;

  numberOfTweets: number;
  numberOfFollowers: number;
  numberOfFollowing: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserProfileService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.handle = params['handle'];
    });

    this.userService.getUserProfile(this.handle)
      .subscribe(
        result => {
          const profile = result.json();

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

        },
        error => {
          if (error.status === 404) {
            this.doesUserExist = false;
          } else if (error.status === 500) {
            this.router.navigateByUrl('/logout');
          }
        }
      );
  }

}
