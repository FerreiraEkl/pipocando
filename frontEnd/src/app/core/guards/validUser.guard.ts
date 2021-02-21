import { AuthService } from './../../modules/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ValidUserGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.hasValidEmail().then(authentication => {
      if (authentication)
        return true;

      M.toast({ html: 'É necessário validar seu email para continuar.' });
      this.authService.logout().then(() => {
        this.router.navigate(['confirmMail']);
        return false;
      });
    })
  }
}
