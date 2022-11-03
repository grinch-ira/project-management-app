import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public canActivate(): boolean | UrlTree {
    return true;
  }
}
