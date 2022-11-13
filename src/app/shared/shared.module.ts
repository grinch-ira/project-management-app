import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
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
  ],
})
export class SharedModule {}
