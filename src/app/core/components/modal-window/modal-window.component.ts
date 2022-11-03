import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowData, ModalWindowHandler } from '@core/models/modal-window.model';
import { ModalWindowService } from '@core/services';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  constructor(public dialog: MatDialog, private modalWindowService: ModalWindowService) {}

  modalWindowData: ModalWindowData = {
    title: '',
    description: '',
  };

  modalWindowInputData!: ModalWindowHandler;

  ngOnInit(): void {
    this.modalWindowService.modalHandler$.pipe().subscribe(data => {
      this.modalWindowData = this.modalWindowService.getModalData(data);
      this.modalWindowInputData = data;
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
