import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ModalWindowService } from '@core/services';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardCreationDialogComponent } from '..';
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
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.translate.currentLang = localStorage.getItem('lang') || 'en';
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

  saveToLocal(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }

  openDialogBoard(): void {
    this.dialog.open(BoardCreationDialogComponent);
  }

  openDialogUser(): void {
    this.dialog.open(UserDialogComponent);
  }
}
