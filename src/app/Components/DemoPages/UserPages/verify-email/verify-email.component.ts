import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.sass']
})
export class VerifyEmailComponent implements OnInit {

  token:any;
  user_token:any;
  message:any; 

  constructor(private authService: AuthService, public rest: ApiService, private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.getToken(this.route.snapshot.params['confirmation_token']); 
  }

  getToken(confirmation_token) {
    this.rest.getToken(confirmation_token).subscribe((data:{ message:any }) => {
      this.user_token = data.message;
    });
  }

}
