import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  // DEBUG: log requests and token presence (temporary)
  try {
    console.debug('[AuthInterceptor] outgoing request:', request.url, 'tokenPresent:', !!token);
    if (token) {
      console.debug('[AuthInterceptor] attaching token (first 8 chars):', token?.slice?.(0,8) + '...');
    }
  } catch (e) { /* ignore debug errors */ }

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(request);
}; 