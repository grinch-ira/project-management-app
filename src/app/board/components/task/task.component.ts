import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@board/services';
import { Task } from '@core/models';
import { ModalWindowService } from '@core/services';
import { HttpResponseService } from '@core/services/http-response.service';
import { EMPTY, switchMap, take, tap } from 'rxjs';

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
    private modalService: ModalWindowService
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
        })
      )
      .subscribe(result => {
        if (result instanceof Array) {
          //Update task order in board service
          this.boardService.updateTasksIndexes(this.columnId);
        }
      });
  }
}
