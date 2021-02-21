import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { MovieService } from '../../../../shared/services/movie.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() seachFor: string;
  @Input() type: string;

  public resultMovies: Array<Movie>;
  private lastSearch: string;

  constructor(private movieService: MovieService) {

  }

  ngOnInit(): void {
    this.lastSearch = this.seachFor;
    this.movieService.searchMovies(this.seachFor).then(movies => {
      this.resultMovies = movies
    });
  }

  ngAfterContentChecked(): void {
    if (this.seachFor != this.lastSearch) {
      this.lastSearch = this.seachFor;
      this.movieService.searchMovies(this.seachFor).then(movies => {
        this.resultMovies = movies
      });
    }
  }
}
