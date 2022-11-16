import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '@board/services';
import { HttpResponseService } from '@core/services/http-response.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  @Output() public modalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() columnId!: string;

  @Input() boardId!: string;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(Number('3')),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(Number('3')),
    ]),
  });

  public closeModal(): void {
    this.modalClose.emit(true);
  }

  constructor(
    private apiService: HttpResponseService,
    private boardService: BoardService
  ) {}

  createTask(): void {
    this.apiService
      .createTask(this.boardId, this.columnId, {
        ...this.formGroup.value,
        order: this.boardService.getTaskLastOrder(this.columnId),
        userId: localStorage.getItem('userId'),
        users: [],
      })
      .subscribe(task => {
        if ('_id' in task) {
          this.boardService.addTask(task, this.columnId);
        }
      });

    this.closeModal();
  }
}
