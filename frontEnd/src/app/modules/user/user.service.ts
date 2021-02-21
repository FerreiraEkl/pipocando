import { User } from './../../core/models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private User: BehaviorSubject<User>;

  constructor(private http:HttpClient) {
    this.User = new BehaviorSubject<User>(null);
  }

  clear() {
    this.User.next(null);
  }

  setData(user: User) {
    this.User.next(user);
  }

  getLoggedUser(): Observable<User> {
    return this.User.asObservable();
  }

  async playing(isPlaying:boolean){
    return await this.http.get<any>(`${environment.api}/user/playing`).toPromise().then(result => {
      if (result.success) {       
        return true;
      }
      return false;
    }).catch(err => {
      return false;
    });
  }
}
