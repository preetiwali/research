
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../user';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './../../../../api.service';
import { AuthService } from './../../../../auth.service';



@Component({
  selector: 'app-updatepassword-admin',
  templateUrl: './updatepassword-admin.component.html',
  styleUrls: ['./updatepassword-admin.component.sass']
})
export class UpdatepasswordADminComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';

  formGroup = new FormGroup({
    confirmpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    currentpassword: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }

  handleValidSubmit() {
    console.log(this.formGroup.value);
    
  }



}