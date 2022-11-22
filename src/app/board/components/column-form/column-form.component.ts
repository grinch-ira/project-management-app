import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BoardService } from '@board/services';
import { HttpResponseService } from '@core/services/http-response.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent {
  @Input() boardId!: string;

  columnForm: FormGroup = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private boardService: BoardService
  ) {}

  createColumn(): void {
    this.apiService
      .createColumn(this.boardId, {
        ...this.columnForm.value,
        order: this.boardService.getColumnLastOrder(),
      })
      .subscribe(col => {
        if ('_id' in col) {
          this.boardService.addColumn(col);
        }
      });
  }
}
