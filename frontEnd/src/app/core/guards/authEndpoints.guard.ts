import { AuthService } from './../../modules/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthEndpointsGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // caso exista algum usário authenticado não pode acessar as rotas de login, registro e confirmação de email
  // mas deve acessar a pagina de mudar a senha

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.isLoggedIn().then(isAuthenticated => {

      if (isAuthenticated) {
        this.router.navigate(['movie']);
        return false;
      }

      return true;
    })
  }
}
