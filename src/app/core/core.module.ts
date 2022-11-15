import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HttpResponseService } from './services/http-response.service';
import { MaterialModule } from '@material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BoardCreationDialogComponent, BoardCreationFormComponent } from './components';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalWindowComponent,
    NotFoundComponent,
    WelcomeComponent,
    DialogComponent,
    BoardCreationDialogComponent,
    BoardCreationFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpResponseService],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalWindowComponent,
    DialogComponent,
    MaterialModule,
  ],
})
export class CoreModule {}
