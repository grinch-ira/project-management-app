import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { BoardsPageComponent } from './pages';
import { BoardCreationFormComponent, BoardItemComponent } from './components';
import { MaterialModule } from '@material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardItemComponent,
    BoardCreationFormComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class MainModule {}
