import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { ControlExpressionProcess } from '@rxweb/reactive-form-validators/directives/template-validations/control-expression-process';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardSeller2 implements  CanActivate {
  constructor(
    private _router: Router,private loginService :LoginService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let isLoggedIn = this.loginService.isLoggedIn();
      let seller = this.loginService.getSeller();
      console.log(seller);
      if (isLoggedIn && seller!==null) {
        this._router.navigate(['/seller/home']);
        return false;
      } else {
        return true;
      }
  }
}
