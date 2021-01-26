import { Component, OnInit } from '@angular/core';
import {HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from './../../../../../theme-options';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../../user';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './../../../../../api.service';
import { AuthService } from './../../../../../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
})
export class DotsComponent implements OnInit {

  user : any;
  user_type:any;
  notifications:any;
  unread_notification:any;
  dropDown = false;

  constructor(public globals: ThemeOptions, private authService: AuthService, public rest: ApiService ,
             private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    this.router.navigate(['/pages/login-boxed']);
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:any, notification:any, unread_notification:any } }) => {
    if (data.message === 'user-info') {
      this.user = data.Data.user;
      this.notifications = data.Data.notification;
      this.unread_notification = data.Data.unread_notification;
      this.user_type = this.user.user_type;
    } else {
      this.logout();
      this.router.navigate(['/pages/login-boxed']);
    }
  });
 }

  readnotification() {
      this.dropDown = true;
      const user_id = localStorage.getItem('user_id');
      this.rest.readNotification(user_id).subscribe((data: {}) => {
      this.getUserInfo(this.route.snapshot.params['id']); 
    });
  }

  seenNotification(id) {
      this.rest.seennotification(id).subscribe((data: {}) => {
      this.getUserInfo(this.route.snapshot.params['id']); 
    });
  }

}
