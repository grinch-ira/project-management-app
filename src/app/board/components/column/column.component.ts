import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Column, Task } from '@core/models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnData!: Column;

  @Input() columnsIds!: string[];

  tasksData: Task[] = [];

  data: string[] = [];

  ngOnInit(): void {
    //TODO: Release real tasks request
    this.tasksData = this.getTasks();
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray<Task>(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem<Task>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateOrderAndIds();

    //TODO: Send to server actual set of tasks
  }

  private updateOrderAndIds(): void {
    this.tasksData = this.tasksData.map((task, i) => {
      return {
        ...task,
        order: i,
        columnId: this.columnData._id,
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
