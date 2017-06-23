import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/user/authentication.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  username: string;
  constructor(
    private authenticationService: AuthenticationService) {
    console.log(localStorage);
    this.username = 'Rob';
  }

  ngOnInit() {
    console.log('Initialized');
  }
}
