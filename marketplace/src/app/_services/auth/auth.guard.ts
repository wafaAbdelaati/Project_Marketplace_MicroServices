import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  constructor(
    private _router: Router,private loginService :LoginService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let isLoggedIn = this.loginService.isLoggedIn();
      if (!isLoggedIn) {
        this._router.navigate(['/signup']);
        return false;
      } else {
        return true;
      }
  }
}
