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
  formDisplayName = '';
  formDisplayError = false;

  profilePicture: string;
  formProfilePicture = '';
  formPictureError = false;

  bio: string;
  formBio = '';
  formBioError = false;

  serverError = false;

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
          if (profile.bio === null) {
            this.bio = 'Something about yourself...';
          } else {
            this.bio = profile.bio;
          }
        },
        error => {
          this.router.navigateByUrl('/user/' + this.handle);
        }
      );
  }

  validateForm() {
    if (this.formDisplayName.length > 3) {
      console.log('form display called');
      if (this.formDisplayName.length > 20) {
        this.formDisplayError = true;
      }
    } else {
      this.formDisplayError = false;
    }

    const URLpattern = new RegExp('^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$');
    this.formPictureError = ! URLpattern.test(this.formProfilePicture);
    if (this.formProfilePicture === '') { this.formPictureError = false; }

    this.formBioError = this.formBio.length > 140;
  }

  updateProfile() {
    this.validateForm();

    if (this.formBioError || this.formPictureError || this.formDisplayError) {
      return;
    }

    const response = {};

    if (this.formBio !== this.bio && this.formBio !== '') {
      response['bio'] = this.formBio;
    }

    if (this.formProfilePicture !== this.profilePicture && this.formProfilePicture !== '') {
      response['profile_picture'] = this.formProfilePicture;
    }

    if (this.formDisplayName !== this.displayName && this.formDisplayName !== '') {
      response['display_name'] = this.formDisplayName;
    }

    this.userService.updateUserProfile(response, this.handle)
      .subscribe(
        res => {
          this.router.navigateByUrl('/user/' + this.handle);
        },
        error => {
          this.serverError = true;
        }
      );

  }

}
