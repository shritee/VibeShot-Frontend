import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = localStorage.getItem('authToken')
  console.log(authToken);
  
  // Clone request and add Authorization header if token exists
  const authReq = authToken ? req.clone({
    setHeaders: { token: `Bearer ${authToken}` }
  }) : req;

  return next(authReq);
};
