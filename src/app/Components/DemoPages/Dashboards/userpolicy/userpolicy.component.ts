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
  selector: 'app-userpolicy',
  templateUrl: './userpolicy.component.html',
  styleUrls: ['./userpolicy.component.sass']
})
export class UserpolicyComponent implements OnInit {

  heading = 'Privacy Policy';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  policies: any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUserPolicy();
  }

  getUserPolicy() {
    this.rest.getAllUserPolicy().subscribe((data) => {
      this.policies = data.Data;
    });
  }

}
