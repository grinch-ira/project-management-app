import { Component, Input, OnInit } from '@angular/core';
import { Task } from '@core/models';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() taskData!: Task;

  constructor() {}

  ngOnInit(): void {}

  getOwnerName(): string {
    //TODO: get owner name
    return 'owner';
  }
}
