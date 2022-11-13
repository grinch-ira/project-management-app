import { Injectable } from '@angular/core';
import { Column } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

  getColumnLastOrder(): number {
    return this.columns.getValue().length;
  }

  addColumn(col: Column): void {
    this.columns.getValue().push(col);
  }

  deleteColumn(id: string): void {
    this.columns.next(this.columns.getValue().filter(col => col._id !== id));
  }
}
