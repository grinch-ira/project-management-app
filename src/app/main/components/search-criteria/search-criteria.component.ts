import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Task, User } from '@core/models';
import { HttpResponseService } from '@core/services';
import { TasksService } from '@main/services/tasks.service';
import { UsersService } from '@shared/services';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss'],
})
export class SearchCriteriaComponent implements OnInit {
  appUsers: User[] = [];

  tasksForm: FormGroup = this.formBuilder.group({
    keywords: [''],
    owner: [''],
    isFullMatch: [''],
  });

  keywordsControl: AbstractControl<string> = this.tasksForm.get('keywords')!;

  ownerControl: AbstractControl<string> = this.tasksForm.get('owner')!;

  isFullMatchControl: AbstractControl<string> = this.tasksForm.get('isFullMatch')!;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private usersService: UsersService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe(users => {
      this.appUsers = users;
    });

    this.keywordsControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keywords: string) => {
          if (keywords.trim().length < 3) {
            return of([]);
          }
          return this.apiService.searchTasks(keywords);
        })
      )
      .subscribe(tasks => {
        this.tasksService.tasksSet$.next(tasks as Task[]);
        this.tasksService.getSearchResults();
      });

    this.ownerControl.valueChanges.subscribe(owner => {
      this.tasksService.owner = owner;
      this.tasksService.getSearchResults();
    });
  }
}
