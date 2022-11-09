import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { SignUpBody } from '@core/models';
import { ModalWindowService, UserService } from '@core/services';
import { take } from 'rxjs';
import { config } from './header.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogIn = false;

  isLogInBehavior = this.auth.isLogIn$.subscribe(value => {
    this.isLogIn = value;
    return value;
  });

  userUpdateForm = new FormGroup({
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

  controlName = this.userUpdateForm.get('name') as FormControl;

  controlLogin = this.userUpdateForm.get('login') as FormControl;

  controlPassword = this.userUpdateForm.get('password') as FormControl;

  constructor(
    private auth: AuthService,
    private modalService: ModalWindowService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  logOut(): void {
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'User',
      action: 'logOut',
      payload: '',
    });
    this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => {
      if (result === 'confirm') {
        this.auth.logOut();
      }
      return;
    });
  }

  changeUserData(): void {
    if (this.userUpdateForm.invalid) {
      return;
    }
    const data = this.userUpdateForm.value as SignUpBody;
    const userId = localStorage.getItem('userId') as string;
    this.userService.updateUser(userId, data);
  }

  deleteUser(): void {
    const userId = localStorage.getItem('userId') as string;
    this.userService.deleteUser(userId);
  }
}
