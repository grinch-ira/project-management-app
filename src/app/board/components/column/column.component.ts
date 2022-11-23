import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@board/services';
import { Column, Task } from '@core/models';
import { ModalWindowService } from '@core/services';
import { HttpResponseService } from '@core/services/http-response.service';
import { EMPTY, switchMap, take, tap } from 'rxjs';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnData!: Column;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @ViewChild('titleInput') titleInputEl!: ElementRef<HTMLElement>;

  tasksData: Task[] = [];

  data: string[] = [];

  titleControl = new FormControl();

  isEditableTitle: boolean = false;

  isTitleUpdatingProgress: boolean = false;

  public isCreateVisible: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: HttpResponseService,
    private boardService: BoardService,
    private modalService: ModalWindowService,
    public focusMonitor: FocusMonitor,
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.boardId = params['id'];
    });

    //TODO: Release real columns request
    this.boardService.tasks[this.columnData._id].subscribe(task => {
      this.tasksData = task;
    });

    this.getTasks();

    this.titleControl.setValidators(Validators.required);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    const columnId = event.container.id.slice(4);
    const taskSetCopy = [...this.tasksData];

    if (event.previousContainer === event.container) {
      moveItemInArray<Task>(this.tasksData, event.previousIndex, event.currentIndex);
      this.apiService
        .updateSetOfTasks(this.boardService.getNewTaskOrders(this.columnData._id))
        .subscribe(res => {
          if (typeof res === 'number') {
            this.boardService.tasks[this.columnData._id].next(taskSetCopy);
          }
        });
    } else {
      transferArrayItem<Task>(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.apiService
        .updateTask(
          this.boardId,
          columnId,
          event.container.data[event.currentIndex]._id,
          {
            order: event.currentIndex,
            title: event.container.data[event.currentIndex].title,
            description: event.container.data[event.currentIndex].description,
            columnId: columnId,
            userId: event.container.data[event.currentIndex].userId,
            users: event.container.data[event.currentIndex].users,
          }
        )
        .subscribe({
          next: newTask => {
            if ('_id' in newTask) {
              this.boardService.updateTask(
                event.currentIndex,
                event.container.data[event.currentIndex].title,
                columnId,
                event.container.data[event.currentIndex].description
              );
            }
          },
        });
    }

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

  showInput(): void {
    this.isEditableTitle = true;
    this.changeDetector.detectChanges();
    this.titleControl.setValue(this.columnData.title);
    this.focusMonitor.focusVia(
      this.renderer.selectRootElement(this.titleInputEl.nativeElement),
      'program'
    );
  }

  updateTitle(): void {
    this.isTitleUpdatingProgress = true;
    this.titleControl.disable();
    this.apiService
      .updateColumn(this.boardId, this.columnData._id, {
        order: this.columnData.order,
        title: this.titleControl.value,
      })
      .subscribe({
        next: newCol => {
          if ('_id' in newCol) {
            this.boardService.updateColumnTitle(this.columnData.order, newCol.title);
          }
        },
        complete: () => {
          this.isEditableTitle = false;
          this.isTitleUpdatingProgress = false;
          this.titleControl.enable();
        },
      });
  }

  hideInput(): void {
    this.isEditableTitle = false;
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

  openDialogTask(): void {
    this.dialog.open(TaskDialogComponent, {
      data: {
        boardId: this.boardId,
        columnId: this.columnData._id,
      },
    });
  }

  public closeModal(): void {
    this.isCreateVisible = false;
  }

  private getTasks(): void {
    setTimeout(() => {
      this.apiService.getAllTasks(this.boardId, this.columnData._id).subscribe(tasks => {
        if (tasks instanceof Array) {
          this.boardService.tasks[this.columnData._id].next(
            tasks.sort((a, b) => a.order - b.order)
          );
        }
      });
    }, 0);
  }
}
