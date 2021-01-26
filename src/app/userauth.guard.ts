import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserauthGuard implements CanActivate {
  
  heading = 'Toastr Alerts';
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // this.toastr.warningToastr('Please login to access the page', 'Warning');
    this.authService.logout();
    this.router.navigate(['/pages/login-boxed']);
    return false;
  }
}
