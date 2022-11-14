import { Component } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ModalWindowService } from '@core/services';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private auth: AuthService,
    private modalService: ModalWindowService,
    public translate: TranslateService
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
}
