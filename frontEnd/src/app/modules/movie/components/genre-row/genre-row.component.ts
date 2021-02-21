import { MovieService } from '../../../../shared/services/movie.service';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Carousel } from 'materialize-css';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-genre-row',
  templateUrl: './genre-row.component.html',
  styleUrls: ['./genre-row.component.css']
})
export class GenreRowComponent implements AfterViewInit, OnDestroy {

  @ViewChild('carousel') carouselElement: ElementRef;
  @Input() category: Category;

  private carousel: Carousel;

  public url = environment.url;

  constructor(private movieService: MovieService) {


  }

  ngAfterViewInit(): void {
    console.log(this.category);
    if (this.carouselElement && this.carouselElement.nativeElement && this.carouselElement.nativeElement.childNodes) {
      this.carousel = M.Carousel.init(this.carouselElement.nativeElement, { numVisible: 11, dist: -50, shift: 10, duration: 300 });
    }
  }

  ngOnDestroy(): void {
    if (this.carousel)
      this.carousel.destroy();
  }

  nextMovie() {
    this.carousel.next();
  }

  prevMovie() {
    this.carousel.prev();
  }
}
