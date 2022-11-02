import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInBody } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private httpResponse: HttpResponseService, private router: Router) {}

  authForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  controlLogin = this.authForm.get('login') as FormControl;

  controlPassword = this.authForm.get('password') as FormControl;

  onLogInButton(): void {
    const data = this.authForm.value as SignInBody;
    if (this.authForm.invalid) {
      return;
    }

    this.httpResponse.logIn(data).subscribe(resp => {
      if ('token' in resp) {
        this.router.navigateByUrl('/board');
      } else if ('noConnection' in resp) {
        this.addInfoAboutError('no Internet Connection, failed to log in');
      } else if ('badRequest' in resp) {
        this.addInfoAboutError('invalid data, check your data');
      } else if ('isNotExist' in resp) {
        this.addInfoAboutError('login or password is incorrect, check your data');
      } else {
        this.addInfoAboutError('failed to log in, try later');
      }
    });
  }

  addInfoAboutError(text: string): void {
    console.log(text);
  }
}
