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

@Component({
  selector: 'app-user-box-common',
  templateUrl: './user-box-common.component.html',
  styleUrls: ['./user-box-common.component.sass']
})
export class UserBoxCommonComponent implements OnInit {

  constructor(public globals: ThemeOptions, private authService: AuthService, public rest: ApiService ,
    private router: Router,private route: ActivatedRoute) {
  }

  user : any;
  user_type:any;
  notifications:any;
  unread_notification:any;

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
  } 

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/pages/login-boxed');
    // window.location.reload();
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
      this.logout()
    }
  });
  }
}
