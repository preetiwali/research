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
  selector: 'app-prvicy-policies',
  templateUrl: './prvicy-policies.component.html',
  styleUrls: ['./prvicy-policies.component.sass']
})
export class PrvicyPoliciesComponent implements OnInit {

  policies:any;
  user_type:any;

  constructor(private authService: AuthService,public rest: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user_type = this.route.snapshot.params['user_type']
    this.getPolicy(this.user_type);
  }

  getPolicy(user_type) {
    this.rest.getAllPolicy(user_type).subscribe((data: {  }) => {
      this.policies = data;
    });
  }

}
