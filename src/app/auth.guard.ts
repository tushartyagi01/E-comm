// import { CanActivateFn } from '@angular/router';
// import { SellerServiceService } from './seller-service.service';

// export const authGuard: CanActivateFn = (route, state) => {
  
//   return false;
// };


import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerServiceService } from './seller-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private sellerService: SellerServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
{
    // You can now use the injected SellerServiceService here
    // ...
    if(localStorage.getItem('seller')) {
      return true;
    }
    this.sellerService.isUserLoggedIn
    return this.sellerService.isUserLoggedIn;
  }
}