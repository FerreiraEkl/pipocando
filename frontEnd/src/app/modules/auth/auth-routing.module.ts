import { AuthEndpointsGuard } from './../../core/guards/authEndpoints.guard';
import { ConfirmMailComponent } from './pages/confirm-mail/confirm-mail.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const authRoutes: Routes = [
  {
    path: '', children: [
      { path: '', redirectTo: 'login' },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [AuthEndpointsGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
        canActivate: [AuthEndpointsGuard]
      },
      {
        path: 'recover',
        children: [
          {
            path: '',
            component: RecoverPasswordComponent,
          },
          {
            path: ':hash',
            component: ChangePasswordComponent,
            pathMatch: 'full',
          }
        ],
        canActivate: [AuthEndpointsGuard]
      },
      {
        path: 'confirmMail',
        children: [
          {
            path: '',
            component: ConfirmMailComponent
          },
          {
            path: ':hash',
            component: ConfirmMailComponent
          }
        ],
        canActivate: [AuthEndpointsGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
