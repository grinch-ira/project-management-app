import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@core/models';
import { HttpResponseService } from '@core/services';
import { UsersService } from '@shared/services';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss'],
})
export class SearchCriteriaComponent implements OnInit {
  appUsers: User[] = [];

  selectedUsers: User[] = [];

  tasksForm: FormGroup = this.formBuilder.group({
    keywords: [''],
    owner: [''],
  });

  keywordsControl: AbstractControl<string> = this.tasksForm.get('keywords')!;

  ownerControl: AbstractControl<string> = this.tasksForm.get('owner')!;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe(users => {
      this.appUsers = users;
    });
  }

  findTasks(): void {
    const searchCriteria = {
      keywords: this.keywordsControl.value as string,
      owner: this.ownerControl.value,
    };
    // TODO send request for getting tasks
  }
}
