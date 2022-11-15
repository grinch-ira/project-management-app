import { Injectable } from '@angular/core';
import { Column, ColumnOrderPatchBody, Task, TaskUpdateBody } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  getColumnLastOrder(): number {
    if (this.columns.getValue().length) {
      return Math.max(...this.columns.getValue().map(col => col.order));
    }
    return 0;
  }

  addColumn(col: Column): void {
    this.columns.getValue().push(col);
  }

  deleteColumn(id: string): void {
    this.columns.next(this.columns.getValue().filter(col => col._id !== id));
  }

  getNewColumnOrders(): ColumnOrderPatchBody[] {
    return this.columns.getValue().map((col, i) => {
      return {
        _id: col._id,
        order: i,
      };
    });
  }

  updateColumnsIndexes(): void {
    this.columns.getValue().forEach((col, i) => {
      col.order = i;
    });
  }

  getTaskLastOrder(): number {
    if (this.tasks.getValue().length) {
      return Math.max(...this.tasks.getValue().map(task => task.order));
    }
    return 0;
  }

  addTask(task: Task): void {
    this.tasks.getValue().push(task);
  }

  deleteTask(id: string): void {
    this.tasks.next(this.tasks.getValue().filter(task => task._id !== id));
  }

  getNewTaskOrders(): TaskUpdateBody[] {
    return this.tasks.getValue().map((task, i) => {
      return {
        _id: task._id,
        order: i,
        columnId: task.boardId,
      };
    });
  }

  updateTasksIndexes(): void {
    this.tasks.getValue().forEach((task, i) => {
      task.order = i;
    });
  }
}
