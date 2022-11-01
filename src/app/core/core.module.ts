import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorModalComponent,
    NotFoundComponent,
    WelcomeComponent,
  ],
  imports: [CommonModule],
})
export class CoreModule {}
