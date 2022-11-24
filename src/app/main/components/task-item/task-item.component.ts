import { Component, Input, OnInit } from '@angular/core';
import { Task } from '@core/models';
import { BoardsService, UsersService } from '@shared/services';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() taskData!: Task;

  constructor(private usersService: UsersService, private boardsService: BoardsService) {}

  ngOnInit(): void {}

  getTaskOwnerName(): string {
    return this.usersService.getName(this.taskData.userId as string);
  }

  getBoardOwnerName(): string {
    return this.boardsService.getOwnerName(this.taskData.boardId);
  }
}
