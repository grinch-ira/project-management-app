import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { SignInBody } from '@core/models';
import { LoaderService } from '@core/services/loader.service';
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
  constructor(private auth: AuthService, public loaderService: LoaderService) {}

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
    this.auth.logIn(data);
  }
}
