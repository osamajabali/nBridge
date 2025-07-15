import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('_accessToken');


  const modifiedRequest = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Interceptor error:', error.message || error.statusText);
      return throwError(() => error);
    })
  );
};
