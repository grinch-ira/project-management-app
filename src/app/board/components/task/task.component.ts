import { Component, Input } from '@angular/core';
import { Task } from '@core/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() taskData!: Task;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @Input() columnId!: string;
}
