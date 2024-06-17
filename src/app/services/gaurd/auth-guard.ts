import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DmcService } from '../dmc.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authourized: any;
  auth: any;
  constructor(private router: Router, private dmc: DmcService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
    | any {
    let token: any = this.dmc.getItem('auth')?.token;

    let unAuth = ['login', 'reset-password/:token', 'signup'];
    if (token) {
      if (unAuth.includes(route.routeConfig?.path!)) {
        this.router.navigateByUrl(`/`);
        return false;
      }
      return true;
    } else {
      if (unAuth.includes(route.routeConfig?.path!)) {
        return true;
      }
      this.router.navigateByUrl(`login`);
      return false;
    }
  }
}
