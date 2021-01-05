import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard3 implements  CanActivate {
  constructor(
    private _router: Router,private loginService :LoginService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let isLoggedIn = this.loginService.isLoggedIn();
      let role = this.loginService.getAdmin().role;
      if (role !== 'super-admin' ) {
        this._router.navigate(['/admin/home']);
        return false;
      } else {
        return true;
      }
  }
}
