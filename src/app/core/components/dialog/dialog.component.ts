import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ModalWindowProperties,
  ModalWindowResultType,
} from '@core/models/modal-window.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalWindowProperties,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  close(confirm: ModalWindowResultType): void {
    this.dialogRef.close(confirm);
  }
}
