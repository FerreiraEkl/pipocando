import { AuthService } from '../../modules/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignatureGurad implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.auth.hasSignature().then(authenticated => {
      if (authenticated)
        return true;

      M.toast({ html: 'Você não tem uma assinatura valida ativa.' });
      this.router.navigate(['payment']);
      return false;
    });
  }
}
