import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-after-study-submission',
  templateUrl: './after-study-submission.component.html',
  styleUrls: ['./after-study-submission.component.sass']
})
export class AfterStudySubmissionComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    completioncode: new FormControl('', Validators.required)
  });

  token:any;
  url:any;

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token']
    // this.url = "http://winpower-llc.s3-website.ap-south-1.amazonaws.com/#/studysubmission/" + this.token; 
    // this.url = "http://localhost:4200/#/studysubmission/" + this.token; 
    this.url = "http://research-square.s3-website.ap-south-1.amazonaws.com/#/studysubmission/" + this.token; 
  }
  

  studySubmitted() {
    this.formGroup.value.completionurl = this.url;
    this.rest.studySubmitted(this.formGroup.value).subscribe((data: { message: any }) => {
      if (data.message === "study-submitted") {
        this.toastr.success('Your study submission is Successful!');
        this.router.navigateByUrl('/participantstudy');
      }else if(data.message === "study-already-submitted"){
        this.toastr.warning('Study Already Submitted !');
        this.router.navigateByUrl('/participantstudy');
      }else if(data.message === "over-time"){
        this.toastr.warning('You are over time');
        this.router.navigateByUrl('/participantstudy');
      }else {
        this.toastr.error('You are not eligible for study!');
        this.router.navigateByUrl('/studysubmission/' + this.token);
      }
    });
  }

}
