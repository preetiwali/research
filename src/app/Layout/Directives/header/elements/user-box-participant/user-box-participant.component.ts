import { Component, OnInit } from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../auth.service';
import { ApiService } from './../../../../../api.service';
import {HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from './../../../../../user';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-box-participant',
  templateUrl: './user-box-participant.component.html',
  styleUrls: ['./user-box-participant.component.sass']
})
export class UserBoxParticipantComponent implements OnInit {

  constructor(public globals: ThemeOptions, private authService: AuthService, public rest: ApiService 
              , private router: Router,private route: ActivatedRoute) {
  }

  user : any;
  wallet:any;
  image_url:any;
  message:any;

  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: { Data: { user:{ wallet:any },image_url:any } }) => {
    this.user = data.Data.user;
    this.wallet = this.user.wallet;
    this.image_url = data.Data.image_url;
  });
 }

  logout() {
    this.authService.logout();
    // window.location.reload();
  }

}
