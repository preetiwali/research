import { Component, OnInit } from '@angular/core';
import {HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from './../../../../theme-options';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../user';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './../../../../api.service';
import { AuthService } from './../../../../auth.service';


@Component({ 
  selector: 'app-terms-user',
  templateUrl: './terms-user.component.html',
  styleUrls: ['./terms-user.component.sass']
})
export class TermsUserComponent implements OnInit {

  terms:any;

  constructor(private authService: AuthService,public rest: ApiService, private route: ActivatedRoute, private router: Router) { }


  user : any;
  user_type:any;

  ngOnInit() {
    this.user_type = this.route.snapshot.params['user_type']
    this.getUserInfo(this.route.snapshot.params['id']); 
    this.getTerms(this.user_type);

  } 
  
  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:any, notification:any, unread_notification:any } }) => {
      if (data.message === 'user-info') {
        this.user = data.Data.user;
        this.user_type = this.user.user_type;
      } else {
      
      }
    });
  }


  getTerms(user_type) {
    this.rest.getAllTerms(user_type).subscribe((data) => {
    this.terms = data;
    console.log(data);
    });
  }

}
