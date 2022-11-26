import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@core/models';
import { BoardsService, UsersService } from '@shared/services';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-boards-filter',
  templateUrl: './boards-filter.component.html',
  styleUrls: ['./boards-filter.component.scss'],
})
export class BoardsFilterComponent implements OnInit, OnDestroy {
  appUsers: User[] = [];

  boardsForm: FormGroup = this.formBuilder.group({
    title: [''],
    owner: [''],
  });

  titleControl: AbstractControl<string> = this.boardsForm.get('title')!;

  ownerControl: AbstractControl<string> = this.boardsForm.get('owner')!;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe(users => {
      this.appUsers = users;
    });

    this.titleControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(title => {
        this.boardsService.titleFilter = title.trim().toLowerCase();
        this.boardsService.getFilterResults();
      });

    this.ownerControl.valueChanges.subscribe(owner => {
      this.boardsService.owner = owner.trim();
      this.boardsService.getFilterResults();
    });
  }

  ngOnDestroy(): void {
    this.boardsService.titleFilter = '';
    this.boardsService.owner = '';
    this.boardsService.getFilterResults();
  }
}
