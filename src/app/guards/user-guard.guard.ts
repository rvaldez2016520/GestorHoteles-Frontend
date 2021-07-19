import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../services/restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.restUser.getUser();

      let token = this.restUser.getToken();
      if(user && token.length > 0 && user.role == "ROLE_CLIENT"){
        return true;
      }else{
          this.router.navigateByUrl('');
          return false;
      }
  }
  
  constructor(private restUser: RestUserService,
    private router: Router){}

}
