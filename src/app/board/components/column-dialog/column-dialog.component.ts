import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-column-dialog',
  templateUrl: './column-dialog.component.html',
  styleUrls: ['./column-dialog.component.scss'],
})
export class ColumnDialogComponent {
  @Input() boardId!: string;

  constructor(
    public dialogRef: MatDialogRef<ColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
