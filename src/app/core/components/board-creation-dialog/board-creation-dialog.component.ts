import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-board-creation-dialog',
  templateUrl: './board-creation-dialog.component.html',
  styleUrls: ['./board-creation-dialog.component.scss'],
})
export class BoardCreationDialogComponent {
  constructor(public dialogRef: MatDialogRef<BoardCreationDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
