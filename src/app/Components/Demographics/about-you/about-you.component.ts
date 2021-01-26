import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.sass']
})
export class AboutYouComponent implements OnInit {

  heading = 'Category List';
  categories: any;
  status: any;
  total_question:any;
  total_response:any;
  total:any;
  message:any;
  totalvalue:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategoryUser();
  }

  getCategoryUser() {
    this.rest.getCategoryUser().subscribe((data: { Data:any ,message:any }) => {
      this.categories = data.Data.demographic_category;
      this.total_question = data.Data.total_question;
      this.total_response = data.Data.total_response;
      this.total =  (this.total_response / this.total_question)*100;
      this.totalvalue = this.total.toFixed(1);
      this.message = data.message;
    });
  }

}
