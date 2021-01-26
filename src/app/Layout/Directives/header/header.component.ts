import {Component, HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './../../../api.service';
import { AuthService } from './../../../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(public globals: ThemeOptions, private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute) {
  }
  
  user : any;
  user_type:any;
  login_count:any;

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  ngOnInit() {
    this.getUserInfo(); 
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    this.router.navigate(['/pages/login-boxed']);

  }

  getUserInfo() {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:{ login_count:any } } }) => {
    if (data.message === 'user-info') {
      this.user = data.Data.user;
      this.user_type = this.user.user_type;
      this.login_count = data.Data.user.login_count;
    } else {
      this.logout();
      this.router.navigate(['/pages/login-boxed']);
    }
  });
 }
}
