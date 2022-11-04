import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-board-creation-form',
  templateUrl: './board-creation-form.component.html',
  styleUrls: ['./board-creation-form.component.scss'],
})
export class BoardCreationFormComponent {
  boardForm: FormGroup = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
      ],
    ],
  });

  constructor(private formBuilder: FormBuilder) {}

  createBoard(): void {}
}
