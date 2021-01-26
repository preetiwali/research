import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgbDate, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import * as $ from 'jquery';


@Component({
  selector: 'app-new-study',
  templateUrl: './new-study.component.html',
  styleUrls: ['./new-study.component.sass'],
  providers: [DatePipe]
})
export class NewStudyComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,public datePipe: DatePipe) { }

  min_to_date:any;
  completion_code:any;
  completion_url:any;
  greaterTime:boolean = false;
  
  ngOnInit() {
    this.completionCode();
    const new_date = new Date();
    this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd'); 
  }

  newstudyform = new FormGroup({
    completionurl: new FormControl('', Validators.required),
    completioncode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    studyurl: new FormControl('', Validators.required),
    allowedtime: new FormControl('', Validators.required),
    estimatetime: new FormControl('', Validators.required),
    submission: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    max_participation_date : new FormControl('', Validators.required)
  });


  newStudy() {
    this.newstudyform.value.user_id = localStorage.getItem('user_id');
    this.rest.newStudy(this.newstudyform.value).subscribe((data: { message: any , Data:any}) => {
      if (data.message === 'study-saved') {
        this.toastr.success('New study successfully added !', 'Success!');
        this.router.navigateByUrl('/studydescription/'+data.Data.id);

      }else if(data.message === 'completion-code-already-exist'){
        // this.toastr.warning('Study already exist!', 'Warning!');
      }
       else {
        this.toastr.error('An error occured while added new study!', 'Oops!');
        this.router.navigateByUrl('/newstudy');
      }
    }); 
  }


  completionCode() {
    this.rest.getcompletionCode().subscribe((data: {Data:any}) => {
      this.completion_code = data.Data.completioncode;
      this.completion_url = data.Data.completionurl;
    });
  }

  
  greaterTimeFunction(){
      if(this.newstudyform.value.estimatetime <=  this.newstudyform.value.allowedtime){
        this.greaterTime = true;
        document.getElementById("maximumtime").classList.remove("ng-invalid");
        document.getElementById("maximumtime").classList.remove("is-invalid");

        document.getElementById("maximumtime").classList.add("ng-valid");
        document.getElementById("maximumtime").classList.add("is-valid");
      } else {
        this.greaterTime = false;
        document.getElementById("maximumtime").classList.remove("ng-valid");
        document.getElementById("maximumtime").classList.remove("is-valid");
  
        document.getElementById("maximumtime").classList.add("ng-invalid");
        document.getElementById("maximumtime").classList.add("is-invalid");
      }
  }

  validateEstimateTime(){
    if(this.newstudyform.value.estimatetime < 1){
      document.getElementById("estimatetime").classList.remove("ng-valid");
      document.getElementById("estimatetime").classList.remove("is-valid");

      document.getElementById("estimatetime").classList.add("ng-invalid");
      document.getElementById("estimatetime").classList.add("is-invalid");
      
    } else {
      document.getElementById("estimatetime").classList.remove("ng-invalid");
      document.getElementById("estimatetime").classList.remove("is-invalid");

      document.getElementById("estimatetime").classList.add("ng-valid");
      document.getElementById("estimatetime").classList.add("is-valid");
    }
}

validateParticipants(){
  if(this.newstudyform.value.submission < 1){
    document.getElementById("submission").classList.remove("ng-valid");
    document.getElementById("submission").classList.remove("is-valid");

    document.getElementById("submission").classList.add("ng-invalid");
    document.getElementById("submission").classList.add("is-invalid");
    
  } else {
    document.getElementById("submission").classList.remove("ng-invalid");
    document.getElementById("submission").classList.remove("is-invalid");

    document.getElementById("submission").classList.add("ng-valid");
    document.getElementById("submission").classList.add("is-valid");
  }
}

  validateMinusValue(){
    if(this.newstudyform.value.reward < 1){
      document.getElementById("reward").classList.remove("ng-valid");
      document.getElementById("reward").classList.remove("is-valid");

      document.getElementById("reward").classList.add("ng-invalid");
      document.getElementById("reward").classList.add("is-invalid");
      
    } else {
      document.getElementById("reward").classList.remove("ng-invalid");
      document.getElementById("reward").classList.remove("is-invalid");

      document.getElementById("reward").classList.add("ng-valid");
      document.getElementById("reward").classList.add("is-valid");
    }
}
}
