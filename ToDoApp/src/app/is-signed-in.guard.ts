import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  constructor(private userService : UserService, private router : Router, private _snackBar : MatSnackBar) {}

  async canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Promise<boolean | UrlTree>
  {
    try {
      await lastValueFrom(this.userService.isConnected());
      return true;
    } catch (err) {
      this._snackBar.open('You are not logged in', 'Close', { duration : 2000 });
      return this.router.createUrlTree(['login']);
    }
  }
}
