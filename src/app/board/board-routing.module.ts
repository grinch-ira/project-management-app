import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: ':id',
    component: BoardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BoardRoutingModule {}
