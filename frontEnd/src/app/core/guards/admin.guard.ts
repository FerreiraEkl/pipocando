import { AuthService } from './../../modules/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.auth.isAdmin().then(authenticated => {
      if (authenticated)
        return true;

      M.toast({ html: 'Nível de acesso insuficiente.' });
      this.router.navigate(['movie']);
      return false;

    });
  }
}
