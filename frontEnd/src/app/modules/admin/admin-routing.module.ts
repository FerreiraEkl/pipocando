import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { MenuComponent } from './pages/menu/menu.component';


const adminRoutes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }