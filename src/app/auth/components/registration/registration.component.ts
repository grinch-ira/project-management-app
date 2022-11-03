import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpBody } from '@core/models/auth.model';
import { HttpResponseService } from '@core/services/http-response.service';
import { config } from './registration.constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  authForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(config.MIN_LENGTH),
      Validators.maxLength(config.MAX_LENGTH),
      Validators.pattern(config.PATTERN_NAME),
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(config.MIN_LENGTH),
      Validators.maxLength(config.MAX_LENGTH),
      Validators.pattern(config.PATTERN_PASSWORD),
    ]),
  });

  controlName = this.authForm.get('name') as FormControl;

  controlLogin = this.authForm.get('login') as FormControl;

  controlPassword = this.authForm.get('password') as FormControl;

  constructor(private httpResponse: HttpResponseService, private router: Router) {}

  onSingUpButton(): void {
    if (this.authForm.invalid) {
      return;
    }
    const data = this.authForm.value as SignUpBody;
    this.httpResponse.signUp(data).subscribe(resp => {
      if ('_id' in resp) {
        this.httpResponse
          .logIn({
            login: data.login,
            password: data.password,
          })
          .subscribe(respLogIn => {
            if ('token' in respLogIn) {
              localStorage.setItem('token', respLogIn.token);
              this.router.navigateByUrl('/main');
            }
          });
      } else {
        this.addInfoAboutError('failed to sign up, try later');
      }
    });
  }

  addInfoAboutError(text: string): void {
    alert(text);
  }
}
