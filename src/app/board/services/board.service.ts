import { Injectable } from '@angular/core';
import { Column, ColumnOrderPatchBody } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);

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
}
