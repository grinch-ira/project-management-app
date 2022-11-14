import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowData, ModalWindowHandler } from '@core/models/modal-window.model';
import { ModalWindowService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, tap } from 'rxjs';
import { DialogComponent } from '..';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private modalWindowService: ModalWindowService,
    private translate: TranslateService
  ) {}

  modalWindowData: ModalWindowData = {
    title: '',
    description: '',
  };

  modalWindowInputData!: ModalWindowHandler;

  lang: string = '';

  ngOnInit(): void {
    this.modalWindowService.modalHandler$
      .pipe(
        tap(_ => {
          this.lang = this.translate.currentLang;
        }),
        switchMap(data =>
          this.translate.getTranslation(this.lang).pipe(
            map(obj => [
              data,
              obj.windowData,
            ])
          )
        )
      )
      .subscribe(data => {
        this.modalWindowData = this.modalWindowService.getModalData(data[0], data[1]);
        this.modalWindowInputData = data[0];
        this.openDialog();
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        data: this.modalWindowData,
        type: this.modalWindowInputData.type,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modalWindowService.modalEmitter$.next(result);
    });
  }
}
