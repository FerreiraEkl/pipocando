import { MovieService } from '../../../../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';


@Component({
  selector: 'app-view-all',
  templateUrl: './viewAll.component.html',
  styleUrls: ['./viewAll.component.css']
})
export class ViewAllComponent implements OnInit {

  public categories: Array<Category>;
  public searching = false;
  public searchFor: string;

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategoryMovies().then(categories => {
      this.categories = categories;
    });
  }

  ngAfterContentInit(): void {
    M.Tabs.init(document.querySelectorAll('.tabs'));
  }

  search(event) {
    if (event.target.value) {
      this.searching = true;
      this.searchFor = event.target.value
    }
    else {
      this.searching = false;
      this.searchFor = null
    }
  }
}
