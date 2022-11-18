import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpResponseService } from './services/http-response.service';
import { MaterialModule } from '@material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BoardCreationDialogComponent, BoardCreationFormComponent } from './components';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { InvalidTokenInterceptor, TokenInterceptor } from './interceptors';


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
    UserDialogComponent,
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
  providers: [
    HttpResponseService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InvalidTokenInterceptor, multi: true },
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalWindowComponent,
    DialogComponent,
    MaterialModule,
  ],
})
export class CoreModule {}
