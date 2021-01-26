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
  selector: 'app-policy-user',
  templateUrl: './policy-user.component.html',
  styleUrls: ['./policy-user.component.sass']
})
export class PolicyUserComponent implements OnInit {

  heading = 'Privacy Policy';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  policies: any;
  user_type:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user_type = this.route.snapshot.params['user_type']
    this.getPolicy(this.user_type);
  }

  getPolicy(user_type) {
    this.rest.getAllPolicy(user_type).subscribe((data) => {
      this.policies = data;
    });
  }

}
