import {Component,HostListener, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ConfigActions} from '../../ThemeOptions/store/config.actions';
import {ThemeOptions} from '../../theme-options';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../user';
import {ApiService} from './../../api.service';
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  animations: [

    trigger('architectUIAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            opacity: 0,
            display: 'flex',
            flex: '1',
            transform: 'translateY(-20px)',
            flexDirection: 'column'

          }),
        ]),
        query(':enter', [
          animate('600ms ease', style({opacity: 1, transform: 'translateY(0)'})),
        ]),

        query(':leave', [
          animate('600ms ease', style({opacity: 0, transform: 'translateY(-20px)'})),
         ], { optional: true })
      ]),
    ])
  ]
})

export class BaseLayoutComponent {

  @select('config') public config$: Observable<any>;

  constructor(public globals: ThemeOptions, public configActions: ConfigActions,private activatedRoute: ActivatedRoute,
               private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute) {
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  user : any;
  user_type:any;
  user_id:any;
  login_count:any;

  ngOnInit() {
    this.getUserInfo(33); 
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:any } }) => {
    if (data.message === 'user-info') {
      this.user = data.Data.user;
      this.user_type = this.user.user_type;
      this.user_id = this.user.id;
      this.login_count = data.Data.user.login_count;

    } else {
      // this.logout();
    }
  });
 }
}



