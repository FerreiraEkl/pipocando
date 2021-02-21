import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<Array<Category>> {
    return this.http.get<any>(`${environment.api}/category`).toPromise().then(data => {
      return <Array<Category>>JSON.parse(data);
    }).catch(err => {
      console.log(err);
      return new Array<Category>();
    });
  }

  async getCategoryMovies(): Promise<Array<Category>> {
    return this.http.get<any>(`${environment.api}/category/movies`).toPromise().then(data => {
      return <Array<Category>>JSON.parse(data);
    }).catch(err => {
      console.log(err);
      return new Array<Category>();
    });
  }

  async createCategory(name): Promise<Category> {
    return this.http.post<any>(`${environment.api}/category`, { categoryName: name }).toPromise().then(data => {
      return <Category>JSON.parse(data);
    }).catch(err => {
      console.log(err);
      return null;
    });
  }
}
