import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board, User } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { TranslateService } from '@ngx-translate/core';
import { BoardsService, UsersService } from '@shared/services';
import { map, Observable, switchMap } from 'rxjs';

interface Translate {
  part1: string;
  part2: string;
}

@Component({
  selector: 'app-board-creation-form',
  templateUrl: './board-creation-form.component.html',
  styleUrls: ['./board-creation-form.component.scss'],
})
export class BoardCreationFormComponent implements OnInit {
  appUsers: User[] = [];

  selectedUsers: User[] = [];

  private message: string = 'test';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  boardForm: FormGroup = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
      ],
    ],
    users: [[]],
  });

  ngOnInit(): void {
    this.usersService.users$.subscribe(users => {
      this.appUsers = users;
    });
  }

  createBoard(): void {
    const board = {
      title: this.boardForm.get('title')?.value as string,
      owner: localStorage.getItem('userId') || '',
      users: (this.boardForm.get('users')?.value as string[]) || [],
    };
    this.apiService
      .createBoard(board)
      .pipe(
        switchMap(res =>
          this.getMessage().pipe(
            map(translate => {
              return {
                res: res,
                translate: translate,
              };
            })
          )
        )
      )
      .subscribe(res => {
        if ((res.res as Board)._id) {
          this.snackBar.open(
            `${res.translate.part1} '${this.boardForm.get('title')?.value}' ${
              res.translate.part2
            }`,
            'OK',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.boardForm.reset();
          this.boardsService.addBoard(res.res as Board);
          this.message = '';
        }
      });
  }

  getFirstUser(): string {
    return this.usersService.getName(this.boardForm.get('users')?.value?.[0]);
  }

  private getMessage(): Observable<Translate> {
    return this.translate.getTranslation(this.translate.currentLang).pipe(
      map(translateObj => {
        return {
          part1: translateObj.mainPage.messagePart1,
          part2: translateObj.mainPage.messagePart2,
        };
      })
    );
  }
}
