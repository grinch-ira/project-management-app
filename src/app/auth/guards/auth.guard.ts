import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }
}
