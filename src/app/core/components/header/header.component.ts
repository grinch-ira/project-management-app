import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { ModalWindowService } from '@core/services';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogIn = false;

  isLogInBehavior = this.auth.isLogIn$.subscribe(value => {
    this.isLogIn = value;
    return value;
  });

  constructor(
    private auth: AuthService,
    private modalService: ModalWindowService,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.currentLang = 'en';
  }

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

  openDialog(): void {
    this.dialog.open(UserDialogComponent);
  }
}
