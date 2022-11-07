import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Board } from '@core/models';
import { HttpResponseService } from '@core/services/http-response.service';
import { BoardsService } from '@shared/services';

@Component({
  selector: 'app-board-creation-form',
  templateUrl: './board-creation-form.component.html',
  styleUrls: ['./board-creation-form.component.scss'],
})
export class BoardCreationFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private boardsService: BoardsService
  ) {}

  boardForm: FormGroup = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
      ],
    ],
  });

  createBoard(): void {
    console.log(this.boardForm.value);
    const board = {
      title: this.boardForm.get('title')?.value as string,
      owner: localStorage.getItem('userId') || '',
      users: [],
    };
    this.apiService.createBoard(board).subscribe(res => {
      if ((res as Board)._id) {
        this.boardsService.addBoard(res as Board);
      }
    });
  }
}
