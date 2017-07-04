import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../_services/user/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
