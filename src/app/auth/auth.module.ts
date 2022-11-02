import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthPageComponent
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
