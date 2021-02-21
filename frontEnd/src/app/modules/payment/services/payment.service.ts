import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  public makePayment(form:any): Promise<any> {
    var url = `${environment.api}/payment`;

    return this.http.post(url, form).toPromise().then(data=>{
      return data;
    }).catch(err=>{
      return err
    });
  }

  public checkPayment(): Promise<any> {
    var url = `${environment.api}/payment`;

    return this.http.get(url).toPromise().then(data=>{
      return data;
    }).catch(err=>{
      return err
    });
  }
}
