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

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  user : any;
  wallet:any;
  image_url;


  constructor(public globals: ThemeOptions, private authService: AuthService, public rest: ApiService ,
               private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
    // this.study_id = this.route.snapshot.params['id']
    // this.getStudyInfo(this.route.snapshot.params['id']); 
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: { Data: { user:{ wallet:any}, image_url:any  } }) => {
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
