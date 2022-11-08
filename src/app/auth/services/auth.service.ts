import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpBody, SignInResponseBody, SignInBody } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogInFromStorage = !!localStorage.getItem('token');

  isLogIn$ = new BehaviorSubject(this.isLogInFromStorage);

  constructor(private httpResponse: HttpResponseService, private router: Router) {}

  signUp(data: SignUpBody): void {
    this.httpResponse.signUp(data).subscribe(resp => {
      if (typeof resp === 'object' && '_id' in resp) {
        this.httpResponse
          .logIn({
            login: data.login,
            password: data.password,
          })
          .subscribe(respLogIn => {
            if (typeof respLogIn === 'object' && 'token' in respLogIn) {
              this.setLogInConfigs(respLogIn);
            }
          });
      } else {
        return;
      }
    });
  }

  logIn(data: SignInBody): void {
    this.httpResponse.logIn(data).subscribe(respLogIn => {
      if (typeof respLogIn === 'object' && 'token' in respLogIn) {
        this.setLogInConfigs(respLogIn);
      } else {
        return;
      }
    });
  }

  setLogInConfigs(respLogIn: SignInResponseBody): void {
    this.isLogIn$.next(true);
    localStorage.setItem('token', respLogIn.token);
    localStorage.setItem('userId', respLogIn._id);
    this.router.navigateByUrl('/main');
  }

  logOut(): void {
    this.isLogIn$.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/welcome');
  }
}
