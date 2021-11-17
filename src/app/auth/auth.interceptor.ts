import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Intercept request to authorize request with oauth service.
   * @param req original request
   * @param next next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.checkUrl(request)) {
      const token = this.authService.getStoredToken()!.token;
      const authorizedReq = request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Access-Control-Allow-Origin', '*'),
      });
      return next.handle(authorizedReq);
    } else {
      return next.handle(request);
    }
  }

  /**
   * Check if request is required authentication.
   * @param req request
   */
  private checkUrl(req: HttpRequest<any>) {
    if (
      req.url.toString().includes('login') ||
      (req.url.toString().includes('users') && req.method == 'POST') ||
      req.url.toString().includes('https://viacep.com.br/ws')
    )

      return false;
    return true;
  }
}
