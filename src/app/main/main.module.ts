import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { BoardsPageComponent } from './pages';
import { BoardItemComponent } from './components';
import { MaterialModule } from '@material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCriteriaComponent } from './components';
import { TaskItemComponent } from './components/task-item/task-item.component';

import { LottieModule } from 'ngx-lottie';
import { BoardsFilterComponent } from './components';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardItemComponent,
    SearchCriteriaComponent,
    TaskItemComponent,
    BoardsFilterComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    LottieModule,
  ],
})
export class MainModule {}
