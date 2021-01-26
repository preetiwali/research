import {Component, HostBinding, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../../theme-options';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-participant-fist-login',
  templateUrl: './participant-fist-login.component.html',
  styleUrls: ['./participant-fist-login.component.sass']
})
export class ParticipantFistLoginComponent implements OnInit {

  user : any;
  user_type:any;
  first_name:any;
  last_name:any;
  contentList:any;
  image_url_id:any;
  image_url:any;

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };
  
  constructor(public globals: ThemeOptions, private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserInfo(); 
    this.getContent(11);
    this.getImages(6);
  }

  getUserInfo() {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user: {first_name:any,last_name:any,user_type:any} } }) => {
    if (data.message === 'user-info') {
      this.user = data.Data.user;
      this.user_type = data.Data.user.user_type;
      this.first_name = data.Data.user.first_name;
      this.last_name = data.Data.user.last_name;
    }
  });
 }

 changeLoginCount(){
  const user_id = localStorage.getItem('user_id');
  this.rest.changeLoginCount(user_id).subscribe((data: {message:any }) => {
      if(data.message === 'change-login-count'){
        location.reload();
        this.router.navigateByUrl('/');
      }
  });
 }

 getContent(id) {
  this.rest.getContent(id).subscribe((data: { message:any , Data:{content:any} }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.contentList = data.Data;
    }
  });
}

getImages(id) {
  this.rest.getImages(id).subscribe((data: { message:any , Data:{image_url:any, page:any } }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.image_url = data.Data.image_url;
      this.image_url_id = data.Data.page.id;
    }
  });
}

}
