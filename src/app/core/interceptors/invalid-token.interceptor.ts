import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          this.authService.logOut();
          throw err;
        }
        throw err;
      })
    );
  }
}
