import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserUtilsService} from '../_services/user/user-utils.service';

@Injectable()
export class SelfGuard implements CanActivate {

  constructor(private router: Router,
            private userUtil: UserUtilsService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const handle = next.params.handle.toString();

    /*
      Light check for user permissions. Backed by server.
     */

    if (handle.toUpperCase() === localStorage.getItem('handle').toUpperCase()) {
      return true;
    } else {
      this.router.navigateByUrl('/user/' + handle);
      return false;
    }
  }
}
