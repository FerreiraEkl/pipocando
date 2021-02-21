import { SignatureGurad } from './../../core/guards/signature.guard';
import { ViewAllComponent } from './pages/viewAll/viewAll.component';
import { ViewComponent } from './pages/view/view.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

const movieRoutes: Routes = [
  {
    path: '', children: [
      { path: 'new', component: CreateComponent, canActivate: [AdminGuard] },
      { path: 'edit/:id', component: EditComponent, canActivate: [AdminGuard] },
      { path: ':id', component: ViewComponent, canActivate: [SignatureGurad] },
      { path: '', component: ViewAllComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(movieRoutes)],
  exports: [RouterModule]
})

export class MovieRoutingModule { }
