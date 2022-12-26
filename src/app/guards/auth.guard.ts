import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router:Router,
    private _authService:AuthService
  ){

  }

  canActivate():any{
    let access:any = this._authService.isAuthenticate();

    if(!access){
      this._router.navigate(['login']);
    }
    return true;
  }
  
}
