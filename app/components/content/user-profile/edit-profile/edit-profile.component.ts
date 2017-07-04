import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from '../../../../_services/profile/user-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [UserProfileService]
})
export class EditProfileComponent implements OnInit {

  private sub: any;

  handle: string;
  profile: any;

  displayName: string;
  profilePicture: string;
  bio: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserProfileService) {
  }

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
          this.bio = profile.bio;
        },
        error => {
          this.router.navigateByUrl('/user/' + this.handle);
        }
      );
  }

}
