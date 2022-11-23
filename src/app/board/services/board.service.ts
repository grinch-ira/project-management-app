import { Injectable } from '@angular/core';
import {
  Column,
  ColumnOrderPatchBody,
  Task,
  TaskSet,
  TaskUpdateBody,
} from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  tasks: TaskSet = {};

  getColumnLastOrder(): number {
    if (this.columns.getValue().length) {
      return Math.max(...this.columns.getValue().map(col => col.order)) + 1;
    }
    return 0;
  }

  addColumn(col: Column): void {
    this.tasks[col._id] = new BehaviorSubject<Task[]>([]);
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

  getTaskLastOrder(colId: string): number {
    if (this.tasks[colId].getValue().length) {
      return Math.max(...this.tasks[colId].getValue().map(task => task.order)) + 1;
    }
    return 0;
  }

  addTask(task: Task, colId: string): void {
    this.tasks[colId].getValue().push(task);
  }

  deleteTask(id: string, colId: string): void {
    this.tasks[colId].next(this.tasks[colId].getValue().filter(task => task._id !== id));
  }

  getNewTaskOrders(colId: string): TaskUpdateBody[] {
    return this.tasks[colId].getValue().map((task, i) => {
      return {
        _id: task._id,
        order: i,
        columnId: task.columnId,
      };
    });
  }

  updateTasksIndexes(colId: string): void {
    this.tasks[colId].getValue().forEach((task, i) => {
      task.order = i;
    });
  }

  fillTaskObject(): void {
    this.columns.getValue().forEach(col => {
      this.tasks[col._id] = new BehaviorSubject<Task[]>([]);
    });
  }

  updateColumnTitle(order: number, title: string): void {
    this.columns.getValue()[order].title = title;
  }

  updateTask(order: number, title: string, colId: string, description: string): void {
    this.tasks[colId].getValue()[order].title = title;
    this.tasks[colId].getValue()[order].description = description;
  }

  updateArrayIndexes(arr: (Column | Task)[]): Array<Column | Task> {
    return arr.map((e, i) => {
      return { ...e, order: i };
    });
  }
}
