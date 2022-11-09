import { Component, Input } from '@angular/core';
import { Column, Task } from '@core/models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() columnData!: Column;

  tasks: Task[] = [];
}
