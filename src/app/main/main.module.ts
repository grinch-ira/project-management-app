import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { BoardsPageComponent } from './pages';
import { BoardCreationFormComponent, BoardItemComponent } from './components';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardItemComponent,
    BoardCreationFormComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
})
export class MainModule {}
