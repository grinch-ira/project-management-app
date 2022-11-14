import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  @Output() public modalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup: FormGroup = new FormGroup({
    taskTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(Number('3')),
    ]),
    taskDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(Number('3')),
    ]),
  });

  public closeModal(): void {
    this.modalClose.emit(true);
  }
}
