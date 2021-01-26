import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeOptions} from './../../../../../theme-options';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../../user';
import {ApiService} from './../../../../../api.service';
import { AuthService } from './../../../../../auth.service';


@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
})
export class MegamenuComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public globals: ThemeOptions, private authService: AuthService, 
    public rest: ApiService , private router: Router,private route: ActivatedRoute) {
  }

  user : any;
  user_type:any;
  user_id:any;


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
    } else {
      // this.logout();
    }
  });
 }

}
