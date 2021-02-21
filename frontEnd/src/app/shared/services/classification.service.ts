import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classification } from 'src/app/core/models/classification.model';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(private http: HttpClient) { }

  async getClassifications(): Promise<Array<Classification>> {
    return this.http.get<any>(`${environment.api}/classification`).toPromise().then(data => {
      return <Array<Classification>>JSON.parse(data);
    }).catch(err => {
      console.log(err);
      return null;
    });
  }

  async createClassification(name): Promise<Classification> {
    return this.http.post<any>(`${environment.api}/classification`, { ClassificationName: name }).toPromise().then(data => {
      return <Classification>JSON.parse(data);
    }).catch(err => {
      console.log(err);
      return null;
    });
  }
}
