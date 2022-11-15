import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpBody } from '@core/models';
import { UserService } from '@core/services';
import { config } from './user.constants';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
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

  constructor(private userService: UserService) {}

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
