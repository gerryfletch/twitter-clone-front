import { ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from '../../../_services/profile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private sub: any;

  doesUserExist = true;

  handle: string;
  profile: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserProfileService,
              private changeDetRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.handle = params['handle'];
    });

    this.userService.getUserProfile(this.handle)
      .subscribe(
        result => {
          this.profile = result.json();
          this.changeDetRef.detectChanges();
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
