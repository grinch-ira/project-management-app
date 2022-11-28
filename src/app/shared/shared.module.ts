import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IsOwnerMarkDirective } from './directives/is-owner-mark.directive';

@NgModule({
  declarations: [IsOwnerMarkDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IsOwnerMarkDirective,
  ],
})
export class SharedModule {}
