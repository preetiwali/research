import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-userterms',
  templateUrl: './userterms.component.html',
  styleUrls: ['./userterms.component.sass']
})
export class UsertermsComponent implements OnInit {

  heading = 'Terms & Conditions';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  terms:any;
  user:any;
  user_type:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUserTerms();
    this.getUserInfo();
  }

  getUserInfo() {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:{ login_count:any } } }) => {
    if (data.message === 'user-info') {
      this.user = data.Data.user;
      this.user_type = this.user.user_type;
    }
  });
 }

  getUserTerms() {
    this.rest.getAllUserTerms().subscribe((data) => {
      this.terms = data.Data;
    });
  }
  }

