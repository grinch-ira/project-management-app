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

  token = localStorage.getItem('token');

  constructor(private httpResponse: HttpResponseService, private router: Router) {}

  signUp(data: SignUpBody): void {
    this.httpResponse.signUp(data).subscribe(resp => {
      if ('_id' in resp) {
        this.httpResponse
          .logIn({
            login: data.login,
            password: data.password,
          })
          .subscribe(respLogIn => {
            if ('token' in respLogIn) {
              this.setLogInConfigs(respLogIn);
            }
          });
      } else {
        this.addInfoAboutError('failed to sign up, try later');
      }
    });
  }

  logIn(data: SignInBody): void {
    this.httpResponse.logIn(data).subscribe(respLogIn => {
      if ('token' in respLogIn) {
        this.setLogInConfigs(respLogIn);
      } else {
        this.addInfoAboutError('failed to log in, try later');
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

  addInfoAboutError(text: string): void {
    alert(text);
  }
}
