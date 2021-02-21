import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("hashcaseultline");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("authorization", idToken)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
