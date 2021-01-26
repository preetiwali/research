import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.sass']
})
export class UserLoginComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';

  formGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }


  handleValidSubmit() {
    this.rest.checkUserLogin(this.formGroup.value).subscribe((data: { message: any , user: { authentication_token: any, id:any }}) => {
 
      if (data.message === "user-logged-in") {
        this.authService.setSessionUser(data);
        // this.toastr.successToastr('You have been successfully logged in', 'Success!');
        this.router.navigateByUrl('/');
      } else {
        // this.toastr.errorToastr('Credentials are incorrect. Please try again', 'Oops!');
        this.router.navigateByUrl('/pages/login-boxed');
      }
    });
  }

}


