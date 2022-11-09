import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Column, Task } from '@core/models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnData!: Column;

  tasksData: Task[] = [];

  ngOnInit(): void {
    //TODO: Release real tasks request
    this.tasksData = this.getTasks();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray<Task>(this.tasksData, event.previousIndex, event.currentIndex);
    this.updateOrder();

    //TODO: Send to server actual set of tasks
  }

  private updateOrder(): void {
    this.tasksData = this.tasksData.map((task, i) => {
      return {
        ...task,
        order: i,
      };
    });
  }

  private getTasks(): Task[] {
    return new Array(6)
      .fill({
        title: '',
        order: NaN,
        description: '',
        userId: '',
        users: [],
        _id: '',
        boardId: '',
        columnId: '',
      })
      .map((_, i: number) => {
        return {
          title: `Task #${i}`,
          order: i,
          description: `Description of task #${i}`,
          userId: 'userID',
          users: [],
          _id: `TID${i}`,
          boardId: 'boardID',
          columnId: '',
        };
      });
  }
}
