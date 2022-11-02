import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalWindowComponent,
    NotFoundComponent,
    WelcomeComponent,
  ],
  imports: [CommonModule],
  exports: [ModalWindowComponent],
})
export class CoreModule {}
