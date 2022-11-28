import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MainRoutingModule {}
