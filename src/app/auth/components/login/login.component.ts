import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInBody } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { config } from './login.constants';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private httpResponse: HttpResponseService, private router: Router) {}

  authForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(config.MIN_LENGTH),
      Validators.pattern(config.PATTERN_PASSWORD),
    ]),
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
        this.router.navigateByUrl('/main');
      } else {
        this.addInfoAboutError('failed to log in, try later');
      }
    });
  }

  addInfoAboutError(text: string): void {
    alert(text);
  }
}
