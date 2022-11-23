import { Component, OnInit } from '@angular/core';
import { Board, Task } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { TasksService } from '@main/services';
import { BoardsService, UsersService } from '@shared/services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boardItems: Board[] = [];

  taskItems: Task[] = [];

  activeLink: string = 'boards';

  constructor(
    private apiService: HttpResponseService,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.boardsService.boards$.subscribe(boards => {
      this.boardItems = boards;
    });

    this.apiService
      .getUsers()
      .pipe(
        switchMap(res => {
          if (res instanceof Array) {
            this.usersService.users$.next(res);
          }
          return this.usersService.users$;
        })
      )
      .subscribe();

    this.tasksService.tasks$.subscribe(tasks => {
      this.taskItems = tasks;
    });

    this.apiService
      .getAllBoards()
      .pipe(
        switchMap(res => {
          if (res instanceof Array) {
            this.boardsService.boards$.next(res);
          }
          return this.boardsService.boards$;
        })
      )
      .subscribe();
  }
}
