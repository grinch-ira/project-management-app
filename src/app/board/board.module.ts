import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardRoutingModule } from './board-routing.module';
import { MaterialModule } from '@material/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { A11yModule } from '@angular/cdk/a11y';
import { ColumnDialogComponent } from './components/column-dialog/column-dialog.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnComponent,
    TaskComponent,
    ColumnFormComponent,
    TaskFormComponent,
    ColumnDialogComponent,
    TaskDialogComponent,
    UpdateTaskComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    BoardRoutingModule,
    MaterialModule,
    DragDropModule,
    A11yModule,
  ],
})
export class BoardModule {}
