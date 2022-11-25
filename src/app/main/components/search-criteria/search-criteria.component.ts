import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Board, Task, User } from '@core/models';
import { HttpResponseService } from '@core/services';
import { TasksService } from '@main/services/tasks.service';
import { BoardsService, UsersService } from '@shared/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss'],
})
export class SearchCriteriaComponent implements OnInit, OnDestroy {
  appUsers: User[] = [];

  boards: Board[] = [];

  tasksForm: FormGroup = this.formBuilder.group({
    keywords: [''],
    board: [''],
    owner: [''],
    isFullMatch: [''],
  });

  keywordsControl: AbstractControl<string> = this.tasksForm.get('keywords')!;

  boardControl: AbstractControl<string> = this.tasksForm.get('board')!;

  ownerControl: AbstractControl<string> = this.tasksForm.get('owner')!;

  isFullMatchControl: AbstractControl<string> = this.tasksForm.get('isFullMatch')!;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private usersService: UsersService,
    private tasksService: TasksService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe(users => {
      this.appUsers = users;
    });

    this.boardsService.boards$.subscribe(boards => {
      this.boards = boards;
    });

    this.keywordsControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keywords: string) => this.apiService.searchTasks(keywords))
      )
      .subscribe(tasks => {
        this.tasksService.setTasks(tasks as Task[]);
        this.tasksService.getSearchResults();
      });

    this.boardControl.valueChanges.subscribe(board => {
      this.tasksService.board = board;
      this.tasksService.getSearchResults();
    });

    this.ownerControl.valueChanges.subscribe(owner => {
      this.tasksService.owner = owner.trim();
      this.tasksService.getSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.tasksService.setTasks([]);
    this.tasksService.getSearchResults();
  }
}
