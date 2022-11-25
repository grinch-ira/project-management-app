import { Component, Input } from '@angular/core';
import { Task } from '@core/models';
import { BoardsService, UsersService } from '@shared/services';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() taskData!: Task;

  constructor(private usersService: UsersService, private boardsService: BoardsService) {}

  getTaskOwnerName(): string {
    return this.usersService.getName(this.taskData.userId as string);
  }

  getBoardName(): string {
    return this.boardsService.getName(this.taskData.boardId);
  }
}
