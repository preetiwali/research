import { Injectable } from '@angular/core';
import { User } from './user';
import * as moment from 'moment';
import {HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClientModule,private router: Router,private route: ActivatedRoute) { }


  // setSessionAdmin(authResult) {
  //   const expiresAt = moment().add(authResult.expires_in, 'second');
  //   localStorage.setItem('id_token', authResult.user.authentication_token);
  //   localStorage.setItem('user_id', authResult.user.id);
  //   localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  // }

  setSessionUser(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem('id_token', authResult.user.authentication_token);
    localStorage.setItem('token', authResult.Token);
    localStorage.setItem('user_id', authResult.user.id);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    this.router.navigate(['/pages/login-boxed']);

  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    // if(expiration || expiresAt){
    //   this.router.navigateByUrl('/pages/login-boxed');
    // }else{
    //   this.router.navigateByUrl('/');
    // }

    return moment(expiresAt);
  }

  public reset(userInfo: User){
    localStorage.setItem('ACCESS_TOKEN', "authentication_token");
  }

}
