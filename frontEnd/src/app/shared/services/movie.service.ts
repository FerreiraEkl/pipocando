import { HttpClient, HttpEvent, HttpEventType, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/core/models/movie.model';

import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private uploadAlert = Swal.mixin({
    willOpen: () => {
      Swal.showLoading()
    }
  });

  constructor(private http: HttpClient) { }

  async getMovie(movieId): Promise<Movie> {
    return await this.http.get<any>(`${environment.api}/movie/${movieId}`).toPromise().then(data => {
      return <Movie>JSON.parse(data);
    }).catch(err => {
      return null
    });
  }

  async searchMovies(search): Promise<Array<Movie>> {
    return await this.http.get<string>(`${environment.api}/movie/search/${search}`).toPromise().then(data => {
      return <Array<Movie>>JSON.parse(data);
    }).catch(err => {
      return new Array<Movie>();
    });
  }

  async getMovies(): Promise<Array<Movie>> {
    return await this.http.get<any>(`${environment.api}/movie`).toPromise().then(data => {
      return <Array<Movie>>JSON.parse(data);
    }).catch(err => {
      return new Array<Movie>();
    });
  }

  async getPicture(movieId): Promise<Blob> {
    return await this.http.get(`${environment.api}/movie/picture/${movieId}`, { responseType: 'blob' }).toPromise().then(
      response => {
        return response;
      }, err => {
        return null;
      });
  }

  async deleteMovie(movieId) {
    return await this.http.delete<any>(`${environment.api}/movie/${movieId}`, {}).toPromise().then(result => {
      return result;
    }).catch(err => {
      return false;
    });
  }

  async putMovie(movieForm, movieId, callback) {

    this.uploadAlert.fire({
      title: 'loading',
      showConfirmButton: false,
      showCloseButton: false,
    });

    var progress: number = 0;

    let movieFormData: FormData = new FormData();
    movieFormData.append('movie', movieForm['movieLocation']);

    this.http.put(`${environment.api}/movie/s3/${movieId}`, movieFormData, { reportProgress: true, observe: 'events' }).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.uploadNotify('Carregando informações!');
          break;

        case HttpEventType.ResponseHeader:
          this.uploadNotify('Cabeçalhos recebidos!');
          break;

        case HttpEventType.UploadProgress:
          progress = Math.round(event.loaded / event.total * 100);
          this.uploadNotify(`Enviando...`, progress);
          break;

        case HttpEventType.Response:
          if (event.status == 200) {
            var response = event.body;

            this.uploadNotify('Filme carregado atualizando informações de registro.', null, 3);

            if (response.fileName)
              movieForm['movieLocation'] = response.fileName;

            if (response.fileType)
              movieForm['movieType'] = response.fileType;

            let fullFormData: FormData = new FormData();

            for (const key of Object.keys(movieForm)) {
              const value = movieForm[key];
              fullFormData.append(key, value);
            }

            this.http.put(`${environment.api}/movie/${movieId}`, fullFormData, { reportProgress: true, observe: 'events' }).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent:
                  this.uploadNotify('Enviando dados!');
                  break;

                case HttpEventType.ResponseHeader:
                  this.uploadNotify('Carregando dados!');
                  break;

                case HttpEventType.UploadProgress:
                  progress = Math.round(event.loaded / event.total * 100);
                  this.uploadNotify('Salvando!', progress);
                  break;

                case HttpEventType.Response:
                  if (event.status == 200) {
                    var response = event.body;

                    this.uploadNotify("Todas as informações foram salvas você será redirecionado para o filme.", null, 3);

                    setTimeout(() => {
                      this.uploadAlert.close();
                    }, 2000);
                    callback(movieId);
                    break;

                  } else {
                    this.uploadNotify("Falha ao atualizar informações do filme mas o upload foi concluído não o faça novamente.", null, 5);
                  }
              }
            });

          } else {
            this.uploadNotify("Ocorreu um erro au fazer upload do filme confira as informações e tente novamente.", null, 2);
          }
      }
    });
  }

  async postMovie(movieForm, callback) {

    this.uploadAlert.fire({
      title: 'loading',
      showConfirmButton: false,
      showCloseButton: false,
    });

    var progress: number = 0;

    let movieFormData: FormData = new FormData();
    movieFormData.append('movie', movieForm['movieLocation']);

    this.http.post(`${environment.api}/movie/s3`, movieFormData, { reportProgress: true, observe: 'events' }).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.uploadNotify('Carregando informações!');
          break;

        case HttpEventType.ResponseHeader:
          this.uploadNotify('Cabeçalhos recebidos!');
          break;

        case HttpEventType.UploadProgress:
          progress = Math.round(event.loaded / event.total * 100);
          this.uploadNotify(`Enviando...`, progress);
          break;

        case HttpEventType.Response:
          if (event.status == 200) {
            var response = event.body;

            this.uploadNotify('Filme carregado atualizando informações de registro.', null, 3);

            if (response.fileName)
              movieForm['movieLocation'] = response.fileName;

            if (response.fileType)
              movieForm['movieType'] = response.fileType;

            let fullFormData: FormData = new FormData();

            for (const key of Object.keys(movieForm)) {
              const value = movieForm[key];
              fullFormData.append(key, value);
            }

            this.http.post(`${environment.api}/movie`, fullFormData, { reportProgress: true, observe: 'events' }).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent:
                  this.uploadNotify('Enviando dados!');
                  break;

                case HttpEventType.ResponseHeader:
                  this.uploadNotify('Carregando dados!');
                  break;

                case HttpEventType.UploadProgress:
                  progress = Math.round(event.loaded / event.total * 100);
                  this.uploadNotify('Salvando!', progress);
                  break;

                case HttpEventType.Response:
                  if (event.status == 200) {
                    var response = event.body;

                    this.uploadNotify("Todas as informações foram salvas você será redirecionado para o filme.", null, 3);

                    setTimeout(() => {
                      this.uploadAlert.close();
                    }, 2000);
                    callback(response.movieId);
                    break;

                  } else {
                    this.uploadNotify("Falha ao atualizar informações do filme mas o upload foi concluído não o faça novamente.", null, 5);
                  }
              }
            });
          } else {
            this.uploadNotify("Ocorreu um erro au fazer upload do filme confira as informações e tente novamente.", null, 2);
          }
      }
    });
  }

  private uploadNotify(info: string, progress?: number, icon?: number) {
    var html = '';

    if (progress) {
      html += `<div class="progress"><div class="determinate" style="width: ${progress.toString()}%"></div></div>`
      html += `<div class="col s12"><span class="flow-text">${progress.toString()}%</span></div>`
    }

    this.uploadAlert.update({
      icon: icon ? (icon == 2 ? 'error' : (icon == 3 ? 'success' : (icon == 4 ? 'question' : (icon == 5 ? 'warning' : 'error')))) : 'info',
      title: "Uploading",
      text: info,
      html: html
    });
  }
}
