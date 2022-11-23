import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, User } from '@core/models';
import { HttpResponseService } from '@core/services';
import { TasksService } from '@main/services/tasks.service';
import { UsersService } from '@shared/services';

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

    this.keywordsControl.valueChanges.subscribe(keywords => {
      this.tasksService.keywords = keywords;
    });

    this.ownerControl.valueChanges.subscribe(owner => {
      this.tasksService.owner = owner;
    });

    this.isFullMatchControl.valueChanges.subscribe(isFullMatch => {
      if (isFullMatch) {
        this.setValidators();
        this.updateControls();
      } else {
        this.resetValidators();
        this.updateControls();
      }
      this.tasksService.isFullMatch = Boolean(isFullMatch);
    });
  }

  findTasks(): void {
    this.apiService
      .searchTasks(this.tasksService.keywords, this.tasksService.owner)
      .subscribe(tasks => {
        this.tasksService.getSearchResults(tasks as Task[]);
      });
  }

  private setValidators(): void {
    this.keywordsControl.setValidators(Validators.required);
    this.ownerControl.setValidators(Validators.required);
  }

  private resetValidators(): void {
    this.keywordsControl.removeValidators(Validators.required);
    this.ownerControl.removeValidators(Validators.required);
  }

  private updateControls(): void {
    this.keywordsControl.updateValueAndValidity({ emitEvent: true });
    this.ownerControl.updateValueAndValidity({ emitEvent: true });
  }
}
