import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Router ,ActivatedRoute} from '@angular/router';
import { Observable, throwError } from "rxjs";
 import { map, filter, catchError, mergeMap } from 'rxjs/operators';
 import { AuthService } from './auth.service';



@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const token =  localStorage.getItem('token');
      // if the token is  stored in localstorage add it to http header
      
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      // clone http to the custom AuthRequest and send it to the server
      const AuthRequest = request.clone( { headers});
      return next.handle(AuthRequest);
      
    } else {
      return next.handle(request);
      // return next.handle(request).pipe(catchError(err => { if (err.status === 401) { MyComponent.logout(); } const error = err.error.message || err.statusText; return throwError(error); }));

    }
  }

// @Injectable()
// export class Interceptor implements HttpInterceptor {
//   constructor(private router: Router,private route: ActivatedRoute, public authService: AuthService) {}
  
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (localStorage.getItem('token') != null) {
//       const token =  localStorage.getItem('token');
//       // if the token is  stored in localstorage add it to http header
//       const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

//       // clone http to the custom AuthRequest and send it to the server
//       const AuthRequest = request.clone( { headers});
//       return next.handle(AuthRequest);
//     } else {
//       // this.router.navigateByUrl('/');
//       return next.handle(request).pipe(catchError(err => { if (err.status === 401) { this.router.navigateByUrl('/'); }
//       const error = err.error.message || err.statusText; return throwError(error); }));    }
//   }
}

