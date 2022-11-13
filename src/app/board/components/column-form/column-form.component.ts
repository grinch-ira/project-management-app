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
    order: [this.boardService.getColumnLastOrder()],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: HttpResponseService,
    private boardService: BoardService
  ) {}

  createColumn(): void {
    this.apiService.createColumn(this.boardId, this.columnForm.value).subscribe(col => {
      if ('_id' in col) {
        this.boardService.addColumn(col);
      }
    });
  }
}
