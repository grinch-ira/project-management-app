import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class BoardModule {}
