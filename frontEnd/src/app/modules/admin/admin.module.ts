import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './pages/menu/menu.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieManagerComponent } from './components/movie-manager/movie-manager.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { RequestsManagerComponent } from './components/requests-manager/requests-manager.component';
import { ContactsManagerComponent } from './components/contacts-manager/contacts-manager.component';

@NgModule({
  declarations: [MenuComponent, MovieManagerComponent, UserManagerComponent, RequestsManagerComponent, ContactsManagerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
