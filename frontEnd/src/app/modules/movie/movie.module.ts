import { CategoryService } from '../../shared/services/category.service';
import { ClassificationService } from '../../shared/services/classification.service';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieService } from '../../shared/services/movie.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewComponent } from './pages/view/view.component';
import { ViewAllComponent } from './pages/viewAll/viewAll.component';
import { GenreRowComponent } from './components/genre-row/genre-row.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './pages/create/create.component';
import { SearchComponent } from './components/search/search.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [
    ViewComponent,
    ViewAllComponent,
    GenreRowComponent,
    CreateComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    MovieService,
    ClassificationService,
    CategoryService
  ],
})
export class MovieModule { }
