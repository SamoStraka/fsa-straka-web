import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "./user";
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  private user: User | undefined;

  constructor(private userService: UserService, private router: Router) {
    userService.onUserChange()
      .subscribe(value => {
        this.user = value;
      })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.user ? true : this.router.parseUrl('/login');
  }

}
