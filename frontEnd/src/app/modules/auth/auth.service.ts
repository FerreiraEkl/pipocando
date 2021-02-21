import { UserService } from '../user/user.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

interface authResponse {
  success: boolean;
  message?: string;
  user?: User;
  expiresIn?: string;
  token?: string;
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  async isLoggedIn(): Promise<boolean> {
    return await this.http.get<authResponse>(`${environment.api}/auth`).toPromise().then(authentication => {
      if (!authentication || !authentication.success)
        return false;

      this.userService.setData(authentication.user);
      return true;

    }).catch(err => {
      return false;
    });
  }

  async isAdmin(): Promise<boolean> {
    return await this.http.get<authResponse>(`${environment.api}/auth/admin`).toPromise().then(authentication => {
      if (!authentication || !authentication.success)
        return false;

      this.userService.setData(authentication.user);
      return true;
    }).catch(err => {
      return false;
    });
  }

  async hasValidEmail(): Promise<boolean> {
    return await this.http.get<authResponse>(`${environment.api}/auth/mail`).toPromise().then(authentication => {
      if (!authentication || !authentication.success)
        return false;

      this.userService.setData(authentication.user);
      return true;
    }).catch(err => {
      return false;
    });
  }

  async hasSignature(): Promise<boolean> {
    return await this.http.get<authResponse>(`${environment.api}/auth/signature`).toPromise().then(authentication => {
      if (!authentication || !authentication.success)
        return false;

      this.userService.setData(authentication.user);
      return true;
    }).catch(err => {
      return false;
    });
  }

  async login(login: string, password: string): Promise<boolean> {

    return await this.http.post<authResponse>(`${environment.api}/auth/login`, { 'login': login, 'password': password }).toPromise().then(result => {

      if (!result.success)
        return false

      var expires = new Date;

      expires = new Date(expires.getTime() + (parseInt(result.expiresIn.replace('d', '')) * 24 * 60 * 60 * 1000));

      window.localStorage.setItem('hashcaseultline', result.token);

      window.localStorage.setItem('expires', JSON.stringify(expires.valueOf()));

      M.toast({ html: 'Bem vindo ' + result.userName });

      this.userService.setData(result.user);

      return true;

    }).catch(err => {
      M.toast({ html: err.error.message });
      return false;
    });
  }

  async logout(): Promise<boolean> {
    return await this.http.get<any>(`${environment.api}/auth/logout`).toPromise().then(result => {
      if (result.success) {
        window.localStorage.removeItem('hashcaseultline');
        window.localStorage.removeItem('expires');
        this.userService.clear();
        return true;
      }
      M.toast({ html: 'Falha ao finalizar sessão, ela será encerrada automaticamente em 24 horas.' });
      return false;
    }).catch(err => {
      M.toast({ html: 'Falha ao finalizar sessão, ela será encerrada automaticamente em 24 horas.' });
      return false;
    });
  }

  async register(user: any): Promise<boolean> {
    return await this.http.post<any>(`${environment.api}/auth/register`, user).toPromise().then(result => {
      if (result.success) {
        return true;
      }
      return false;
    }).catch(err => {
      M.toast({ html: err.error.message });
      return false;
    });
  }

  async confirmMail(hash: string): Promise<boolean> {
    return await this.http.post<any>(`${environment.api}/auth/mailConfirmation`, { hash: hash }).toPromise().then(result => {
      if (result.success) {
        return true;
      }
      return false;
    }).catch(err => {
      M.toast({ html: err.error.message });
      return false;
    });
  }

  async recoverAccount(email): Promise<boolean | string> {
    return await this.http.post<authResponse>(`${environment.api}/auth/recover`, email)
      .toPromise()
      .then(result => {
        if (result.success)
          return true;
        return result.message;
      }).catch(err => {
        return err.error.message;
      });
  }

  async setNewPassword(form): Promise<boolean | string> {
    return await this.http.post<authResponse>(`${environment.api}/auth/setPassword`, form)
      .toPromise()
      .then(result => {
        if (result.success)
          return true;
        return result.message;
      }).catch(err => {
        return err.error.message;
      });
  }
}
