import { Component } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AuthenticationService} from '../_services/security/login/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.scss']
})
export class HomePageComponent {
  isLogin: boolean;
  constructor(private router: Router,
              private auth: AuthenticationService) {

    console.log(localStorage);
    if ( auth.isLoggedIn() ) {
      this.router.navigateByUrl('/dashboard');
    }

    this.isLogin = (this.router.url === '/login');
  }
}
