import {Component} from '@angular/core';

import {AuthenticationService} from '../../_services/index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  login() {
    this.loading = true;
    this.authenticationService.login('istannen', 'Passw0rd6')
      .subscribe(result => {
        if (result === true) {
          console.log('Logged in.');
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Username or Password is incorrect.';
          this.loading = false;
        }
      });
  }
}
