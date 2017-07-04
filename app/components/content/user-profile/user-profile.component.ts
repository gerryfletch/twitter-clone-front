import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserProfileService} from '../../../_services/user/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [ UserProfileService ]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  handle: string;
  private sub: any;

  doesUserExist = true;

  private profile: any;

  constructor(private route: ActivatedRoute,
              private userService: UserProfileService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.handle = params['handle'];
    });

    this.userService.getUserProfile(this.handle)
      .map(res => {
        console.log('status: ' + res.status);
        if (res.status === 404) {
          this.doesUserExist = false;
        }
      })
      .subscribe(
        profile => this.profile = profile,
        error => console.log(error)
      );

    console.log(this.profile);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
