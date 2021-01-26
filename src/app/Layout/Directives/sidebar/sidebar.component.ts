import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import {ApiService} from './../../../api.service';
import { AuthService } from './../../../auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

  public extraParameter: any;
  constructor(private activatedRoute: ActivatedRoute, public globals: ThemeOptions, private authService: AuthService, 
              public rest: ApiService , private router: Router,private route: ActivatedRoute) {
  }
  user : any;
  user_type:any;
  user_id:any;
  login_count:any;

  @select('config') public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    this.getUserInfo(33); 
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });
    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;
    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
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
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user: { login_count:any } } }) => {
    if (data.message === 'user-info') {
      this.user = data.Data.user;
      this.user_type = this.user.user_type;
      this.user_id = this.user.id;
      this.login_count = data.Data.user.login_count;
    } else {
      this.logout();
      this.router.navigate(['/pages/login-boxed']);

    }
  });
 }
}
