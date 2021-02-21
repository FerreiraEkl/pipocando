import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmMailComponent } from './pages/confirm-mail/confirm-mail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ConfirmMailComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
