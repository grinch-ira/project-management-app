import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalWindowData, ModalWindowProperties } from '@core/models/modal-window.model';
import { ModalWindowService } from '@core/services';
import { skip } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalWindowProperties,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}

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
    this.dialog.open(DialogComponent, {
      data: {
        data: this.modalWindowData,
        type: this.modalWindowType,
      },
    });
  }
}
