import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-completion-code',
  templateUrl: './forgot-completion-code.component.html',
  styleUrls: ['./forgot-completion-code.component.sass']
})
export class ForgotCompletionCodeComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }
  
  token:any;
  url:any;
  
  formGroup = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    // this.url = "http://winpower-llc.s3-website.ap-south-1.amazonaws.com/#/studysubmission/" + this.token; 
    this.url = "http://research-square.s3-website.ap-south-1.amazonaws.com/#/studysubmission/" + this.token; 
  }


  forgotCompletionCode() {
    this.formGroup.value.completionurl = this.url;
    this.rest.forgotCompletionCode(this.formGroup.value).subscribe((data: { message: any }) => {
      if (data.message === "completion code has been sent") {
        this.toastr.success('Completion code has been sent to your registered email');
        this.router.navigateByUrl('/studysubmission/' + this.token);
      }else if (data.message === "you are not eligible for study") {
        this.toastr.warning('You are not eligible for study');
        this.router.navigateByUrl('/studysubmission/' + this.token);
      }else {
        this.toastr.error('An error occured while forgot completion code!','Error');
        this.router.navigateByUrl('/studysubmission/' + this.token);
      }
    });
  }
  
}
