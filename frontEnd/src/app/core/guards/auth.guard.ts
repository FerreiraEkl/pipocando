import { AuthService } from './../../modules/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.isLoggedIn().then(authenticated => {
      if (!authenticated) {
        M.toast({ html: 'Efetue login para continuar.' });
        this.router.navigate(['login']);
        return false;
      }
      return true;
    });
  }
}
