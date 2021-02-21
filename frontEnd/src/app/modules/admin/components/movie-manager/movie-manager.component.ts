import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';

import { MovieService } from 'src/app/shared/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-manager',
  templateUrl: './movie-manager.component.html',
  styleUrls: ['./movie-manager.component.css']
})
export class MovieManagerComponent implements OnInit {


  public movies: Array<Movie>;

  constructor(private movieService: MovieService) {
    this.movieService.getMovies().then(movies => {
      this.movies = movies;
    });
  }

  ngOnInit(): void {
  }

  deleteMovie(movieId) {

    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.movieService.deleteMovie(movieId).then(result => {
          if (result) {
            Swal.fire(
              'Deletado!',
              'O filme foi deletado.',
              'success'
            ).then(() => {
              this.movieService.getMovies().then(movies => {
                this.movies = movies;
              });
            })
          } else {
            Swal.fire(
              'Falha!',
              'O filme não foi deletado.',
              'warning'
            )
          }
        });
      }
    });
  }
}
