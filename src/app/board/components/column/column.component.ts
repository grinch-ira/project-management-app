import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '@board/services';
import { Column, Task } from '@core/models';
import { ModalWindowService } from '@core/services';
import { HttpResponseService } from '@core/services/http-response.service';
import { EMPTY, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnData!: Column;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @Input() columnId!: string;

  tasksData: Task[] = [];

  data: string[] = [];

  public isCreateVisible: boolean = false;

  constructor(
    private apiService: HttpResponseService,
    private boardService: BoardService,
    private modalService: ModalWindowService
  ) {}

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

  deleteColumn(): void {
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'Column',
      action: 'delete',
      payload: this.columnData.title,
    });

    this.modalService.modalEmitter$
      .pipe(
        take(1),
        // Delete the column on server
        switchMap(res =>
          res === 'confirm'
            ? this.apiService.deleteColumn(this.boardId, this.columnData._id)
            : EMPTY
        ),
        // Delete the column in board service
        tap(col => {
          if ('_id' in col) {
            this.boardService.deleteColumn(col._id);
          }
        }),
        //Update column order on server
        switchMap(res =>
          '_id' in res
            ? this.apiService.updateSetOfColumns(this.boardService.getNewColumnOrders())
            : EMPTY
        )
      )
      .subscribe(result => {
        if (result instanceof Array) {
          //Update column order in board service
          this.boardService.updateColumnsIndexes();
        }
      });
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

  openCreateTaskForm(value: boolean): void {
    this.isCreateVisible = value;
  }

  public closeModal(): void {
    this.isCreateVisible = false;
  }
}
