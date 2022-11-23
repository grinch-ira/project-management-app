import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
