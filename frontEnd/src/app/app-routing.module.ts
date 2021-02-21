import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { ValidUserGuard } from './core/guards/validUser.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./modules/auth/auth.module`).then(module => module.AuthModule)
  },
  {
    path: 'movie',
    loadChildren: () => import(`./modules/movie/movie.module`).then(module => module.MovieModule),
    canActivate: [AuthGuard, ValidUserGuard]
  },
  {
    path: 'user',
    loadChildren: () => import(`./modules/user/user.module`).then(module => module.UserModule),
    canActivate: [AuthGuard, ValidUserGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import(`./modules/payment/payment.module`).then(module => module.PaymentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import(`./modules/admin/admin.module`).then(module => module.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
