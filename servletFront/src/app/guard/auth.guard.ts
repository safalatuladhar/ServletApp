import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
     private router: Router, private readonly loginService: LoginService
     ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.getToken() !== null){
         const role = route.data["roles"] as Array<string>;

         if(role){
            const match = this.loginService.roleMatch(role);

            if(match){
              return true;
            } else{
              this.router.navigate(['/forbidden']);
              return false;
            }
         }
      }

      this.router.navigate(['/login']);
      return false;

  }
  
}
