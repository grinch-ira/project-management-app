import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowData } from '@core/models/modal-window.model';
import { ModalWindowService } from '@core/services';
import { skip } from 'rxjs';
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

  modalWindowType: string = 'message';

  ngOnInit(): void {
    this.modalWindowService.modalHandler$.pipe(skip(1)).subscribe(data => {
      this.modalWindowData = this.modalWindowService.getModalData(data);
      this.modalWindowType = data.type;
      this.openDialog();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        data: this.modalWindowData,
        type: this.modalWindowType,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
