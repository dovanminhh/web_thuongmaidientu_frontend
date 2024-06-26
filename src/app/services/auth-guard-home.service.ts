import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardHomeService implements CanActivate{

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var checkCustomer = sessionStorage.getItem('customer-login');
    if(!checkCustomer){
      //chuyển hướng về trang login router
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
    
  }
}
