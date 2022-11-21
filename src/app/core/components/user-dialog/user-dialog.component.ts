import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpBody } from '@core/models';
import { HttpResponseService, ModalWindowService } from '@core/services';
import { UserService } from '@core/services/user.service';
import { take } from 'rxjs';
import { config } from './user.constants';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit, AfterContentChecked {
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
    private userService: UserService,
    private modalService: ModalWindowService,
    private apiService: HttpResponseService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId') as string;
    setTimeout(() => {
      this.apiService.getUser(userId).subscribe(value => {
        if ('_id' in value) {
          this.controlName.setValue(value.name);
          this.controlLogin.setValue(value.login);
        }
        return value;
      });
    }, 0);
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
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'User',
      action: 'delete',
      payload: '',
    });
    this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => {
      if (result === 'confirm') {
        const userId = localStorage.getItem('userId') as string;
        this.userService.deleteUser(userId);
      }
      return;
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
