import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board, User } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { BoardsService, UsersService } from '@shared/services';

@Component({
  selector: 'app-board-creation-form',
  templateUrl: './board-creation-form.component.html',
  styleUrls: ['./board-creation-form.component.scss'],
})
export class BoardCreationFormComponent implements OnInit {
  appUsers: User[] = [];

  selectedUsers: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private snackBar: MatSnackBar
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
    this.apiService.createBoard(board).subscribe(res => {
      if ((res as Board)._id) {
        this.snackBar.open(
          `The board '${this.boardForm.get('title')?.value}' has been created`,
          'OK',
          {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
        this.boardForm.reset();
        this.boardsService.addBoard(res as Board);
      }
    });
  }

  getFirstUser(): string {
    return this.usersService.getName(this.boardForm.get('users')?.value?.[0]);
  }
}
