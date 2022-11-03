import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MaterialModule } from '@material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    AuthPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {}
