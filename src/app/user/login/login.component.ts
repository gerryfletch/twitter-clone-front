import {Component} from '@angular/core';

import {AuthenticationService} from '../../_services/index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  handle = '';
  password = '';

  loading = false;
  error = '';
  isError = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.handle, this.password)
      .subscribe(
        (result) => {
          if (result === true) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Something went wrong.';
            this.isError = true;
            this.loading = false;
          }
        },
        (error) => {
          const errorJson = JSON.parse(error._body);
          this.error = errorJson.error;
          this.isError = true;
          this.loading = false;
        });
  }
}
