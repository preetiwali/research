import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password-boxed',
  templateUrl: './forgot-password-boxed.component.html',
  styles: []
})
export class ForgotPasswordBoxedComponent implements OnInit {

  forgotPassword = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }


  handleValidSubmit() {
    this.rest.checkforgotPassword(this.forgotPassword.value).subscribe((data: { message: any }) => {

      if (data.message === "Confirmation email has been sent") {
        this.toastr.success('Verification code has been sent', 'Success');
        this.router.navigateByUrl('/pages/login-boxed');
      } else {
        this.toastr.error('An error occured while forgot password!','Error');
        this.router.navigateByUrl('/pages/forgot-password-boxed');
      }
    });
  }
}
