import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpBody } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { HttpResponseService } from './http-response.service';
import { ModalWindowService } from './modal-window.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogInFromStorage = !!localStorage.getItem('token');

  isLogIn$ = new BehaviorSubject(this.isLogInFromStorage);

  constructor(
    private httpResponse: HttpResponseService,
    private router: Router,
    private modalService: ModalWindowService
  ) {}

  updateUser(userId: string, data: SignUpBody): void {
    this.httpResponse.updateUser(userId, data).subscribe(resp => {
      if (typeof resp === 'object' && '_id' in resp) {
        this.modalService.modalHandler$.next({
          type: 'confirm',
          emitter: 'User',
          action: 'logOut',
          payload: '',
        });
      }
    });
  }

  deleteUser(userId: string): void {
    this.httpResponse.deleteUser(userId).subscribe(resp => {
      if (typeof resp === 'object' && '_id' in resp) {
        this.isLogIn$.next(false);
        localStorage.clear();
        this.router.navigateByUrl('/welcome');
      } else {
        return;
      }
    });
  }
}
