import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SelfGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const handle = next.params.handle.toString();
    if (handle.toUpperCase() === localStorage.getItem('handle').toString().toUpperCase()) {
      return true;
    }

    this.router.navigateByUrl('/user/' + handle);

    return false;
  }
}
