import {Component} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from "@angular/router";
/**
 * Created by Gerry on 11/06/2017.
 */
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  username: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    console.log(localStorage);
    this.username = 'Rob';
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }
}
