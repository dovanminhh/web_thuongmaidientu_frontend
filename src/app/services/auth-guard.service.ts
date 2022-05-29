import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var checkLogin = sessionStorage.getItem('user-login');
    if(!checkLogin){
      //chuyển hướng về trang login router
      this.router.navigate(['/admin/login']);
      return false;
    }else{
      return true;
    }
    
  }
}
