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
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.sass']
})
export class TermsConditionsComponent implements OnInit {

  terms:any;
  user_type:any;

  constructor(private authService: AuthService,public rest: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user_type = this.route.snapshot.params['user_type']
    this.getTerms(this.user_type);
  }

  // getTerms() {
  //   this.rest.getAllTerms().subscribe((data) => {
  //   this.terms = data;
  //   });
  // }

  getTerms(user_type) {
    this.rest.getAllTerms(user_type).subscribe((data: { }) => {
      this.terms = data;
      console.log(this.terms);
    });
  }

}
