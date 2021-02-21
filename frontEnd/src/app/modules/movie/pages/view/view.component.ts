import { UserService } from './../../../user/user.service';
import { MovieService } from '../../../../shared/services/movie.service';

import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import * as Plyr from 'plyr';

import { User } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  @ViewChild('moviePlayer', { static: true }) movieElement: ElementRef;
  @ViewChild('movieBackground') movieBackgroundElement: ElementRef;

  public movie: Movie;
  public user: User;
  public loading = true;
  public url = environment.url;

  private subs: Array<Subscription>;

  public player;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public userService: UserService
  ) {
    this.subs = new Array<Subscription>();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieService.getMovie(params['id']).then(movie => {
        if (movie) {
          this.movie = movie;

          this.player = new Plyr(this.movieElement.nativeElement, {
            debug: false,
            displayDuration: true,
            keyboard: {
              global: true,
            },
            tooltips: {
              controls: true,
            },
            captions: {
              active: true,
            }
          });

          this.player.source = {
            type: 'video',
            title: this.movie.movieTitle,
            sources: [
              // { 048952352974263abe6fc3cce1653b09.mkv
              // src: `http://localhost:4000/api/movie/play/${movie.movieLocation}`,
              // type: 'video/webm',
              // size: 1080,
              // },
              {
                src: `https://yourvideotape2.s3-sa-east-1.amazonaws.com/Movies/${movie.movieLocation}`,
                type: movie.movieType || 'video/webm',
                size: 1080
              }
            ],
            poster: '/assets/images/logo.png',
            tracks: [
              // {
              // kind: 'captions',
              // label: 'French',
              // srclang: 'fr',
              // src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
              //},
            ],
            // previewThumbnails: {
            //  src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
            // },
          };

          if (this.movie.moviePicture)
            this.movieService.getPicture(this.movie.moviePicture).then(data => {
              if (data) {
                var reader = new FileReader();
                reader.onload = (e) => {
                  this.movieBackgroundElement.nativeElement.style.backgroundImage = "url('" + e.target.result + "')";
                }
                reader.readAsDataURL(data);
              }
            });

          if (this.movieElement.nativeElement.audioTracks) {
            for (var i = 0; i < this.movieElement.nativeElement.audioTracks.length; i++) {
              if (this.movieElement.nativeElement.audioTracks[i].language.substring(0, 2) === "pt-BR") { /*Alterar pela lingua que você quer*/
                this.movieElement.nativeElement.audioTracks[i].enabled = true;
              } else {
                this.movieElement.nativeElement.audioTracks[i].enabled = false;
              }
            }
          }

          this.loading = false;
        }
      });
    });

    this.subs.push(this.userService.getLoggedUser().subscribe(user => this.user = user));
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
      // this.userService.playing(false);
    }
    this.subs.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
