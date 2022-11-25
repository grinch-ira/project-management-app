import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAssignedUser } from '@core/models';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent {
  title!: string;

  description!: string;

  updateTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) { title, description }: IAssignedUser,
    private dialogRef: MatDialogRef<UpdateTaskComponent>
  ) {
    this.title = title;
    this.description = description;

    this.updateTaskForm = fb.group({
      title: [
        title,
        Validators.required,
      ],
      description: [
        description,
        Validators.required,
      ],
    });
  }

  onUpdateValue(): void {
    this.dialogRef.close(this.updateTaskForm.value);
  }
}
