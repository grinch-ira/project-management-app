import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@board/services';
import { Task } from '@core/models';
import { ModalWindowService } from '@core/services';
import { HttpResponseService } from '@core/services/http-response.service';
import { EMPTY, switchMap, take, tap } from 'rxjs';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() taskData!: Task;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @Input() columnId!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: HttpResponseService,
    private boardService: BoardService,
    private modalService: ModalWindowService,
    public dialog: MatDialog
  ) {}

  deleteTask(): void {
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'Task',
      action: 'delete',
      payload: this.taskData.title,
    });

    this.modalService.modalEmitter$
      .pipe(
        take(1),
        // Delete the task on server
        switchMap(res =>
          res === 'confirm'
            ? this.apiService.deleteTask(this.boardId, this.columnId, this.taskData._id)
            : EMPTY
        ),
        // Delete the task in board service
        tap(task => {
          if ('_id' in task) {
            this.boardService.deleteTask(task._id, this.columnId);
          }
        }),
        switchMap(res =>
          '_id' in res && this.boardService.hasTasks(this.taskData.columnId)
            ? this.apiService.updateSetOfTasks(
                this.boardService.getNewTaskOrders(this.columnId)
              )
            : EMPTY
        )
      )
      .subscribe(result => {
        if (result instanceof Array) {
          //Update task order in board service
          this.boardService.updateTasksIndexes(this.columnId);
        }
      });
  }

  openUpdateTaskDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: this.taskData.title,
      description: this.taskData.description,
    };

    const dialogRef = this.dialog.open(UpdateTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editedTask = {
          ...this.taskData,
          ...result,
        };
        this.apiService
          .updateTask(this.boardId, editedTask.columnId, this.taskData._id, {
            order: this.taskData.order,
            title: editedTask.title,
            description: editedTask.description,
            columnId: this.columnId,
            userId: this.taskData.userId,
            users: this.taskData.users,
          })
          .subscribe({
            next: newTask => {
              if ('_id' in newTask) {
                this.boardService.updateTask(
                  this.taskData.order,
                  editedTask.title,
                  this.columnId,
                  editedTask.description
                );
              }
            },
          });
      }
    });
  }
}
