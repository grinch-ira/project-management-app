import { Component, OnInit } from '@angular/core';
import { Board } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { BoardsService, UsersService } from '@shared/services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boardItems: Board[] = [];

  constructor(
    private apiService: HttpResponseService,
    private boardsService: BoardsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.boardsService.boards$.subscribe(boards => {
      this.boardItems = boards;
    });

    this.apiService
      .getUsers()
      .pipe(
        switchMap(res => {
          console.log(res);
          if (res instanceof Array) {
            this.usersService.users$.next(res);
          }
          return this.usersService.users$;
        })
      )
      .subscribe();

    this.apiService
      .getAllBoards()
      .pipe(
        switchMap(res => {
          console.log(res);
          if (res instanceof Array) {
            this.boardsService.boards$.next(res);
          }
          return this.boardsService.boards$;
        })
      )
      .subscribe();
  }
}
