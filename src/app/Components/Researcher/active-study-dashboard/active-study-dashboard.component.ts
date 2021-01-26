import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-active-study-dashboard',
  templateUrl: './active-study-dashboard.component.html',
  styleUrls: ['./active-study-dashboard.component.sass'],
  providers: [DatePipe]

})
export class ActiveStudyDashboardComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,private formBuilder: 
    FormBuilder,private modalService: NgbModal ,private toastr: ToastrService, public datePipe: DatePipe) { }


study:any;
required_participant:any;
active_candidate:any;
candidateInfo:any
submitted_candidate_list:any;
closeResult: string;
study_id:any;
submitted_candidate_count:any;
rejected_candidate_count:any;
accepted_candidate_count:any;
min_to_date:any;
max_participation_date:any;
new_date:any;
new_study_id:any;

active_candidate_list:any;
accepted_candidate_list:any;
rejected_candidate_list:any;
reaccepted_candidate_list:any;
seen_candidates:any;
attempted_candidates:any;
submitted_candidates:any;
accepted_candidates:any;
rejected_candidates:any;
totalrejection:any;
studystatus= false;


study_wallet:any;

rejectsubmitstudy = new FormGroup({
  reject_reason: new FormControl('', Validators.required)
});


openLarge(content) {
  this.modalService.open(content, {
    size: 'lg'
  });
}

open(content) {
  this.modalService.open(content).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

ngOnInit() {
  this.getResearcherStudyInfo(this.route.snapshot.params['id']); 
  this.study_id = this.route.snapshot.params['id'];
  this.getCandidateInfo(this.route.snapshot.params['id']); 
  this.getStudyInfo(this.study_id); 
  this.getSubmittedCandidateInfo(this.route.snapshot.params['id']); 
  this.getAcceptCandidateInfo(this.route.snapshot.params['id']); 
}

// studyStatus(){
//  this.studystatus = true;
// }

getResearcherStudyInfo(id) {
  this.rest.getResearcherStudyInfo(id).subscribe((data: {message:any, Data: { study:any, accepted_candidate_count:any ,rejected_candidate_count:any 
  ,required_participant:any,submitted_candidate_count:any, active_candidate:any,submitted_candidate_list:any ,active_candidate_list:any} }) => {
  if(data.message == 'unauthorised-user'){
    this.router.navigateByUrl('/');
  }else{
    this.study = data.Data.study;
    this.required_participant = data.Data.required_participant;
    this.active_candidate = data.Data.active_candidate;
    this.candidateInfo = data.Data.active_candidate_list;
    this.submitted_candidate_list = data.Data.submitted_candidate_list;
    this.submitted_candidate_count = data.Data.submitted_candidate_count;
    this.rejected_candidate_count = data.Data.rejected_candidate_count;
    this.accepted_candidate_count = data.Data.accepted_candidate_count;
    this.max_participation_date = this.datePipe.transform(this.study.max_participation_date,'yyyy-MM-dd');
    }
  });
}

getCandidateInfo(id) {
  this.rest.getCandidateInfo(id).subscribe((data: {message:any, Data: { active_candidate_list:any } }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.active_candidate_list = data.Data.active_candidate_list;
    }
  });
}

getStudyInfo(id) {
  this.rest.getStudyDetails(id).subscribe((data: {message:any, Data:any }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.getStudyInfo(this.study_id); 
      this.seen_candidates = data.Data.seen_candidates;
      this.attempted_candidates = data.Data.attempted_candidates;
      this.submitted_candidates = data.Data.submitted_candidates;
      this.accepted_candidates = data.Data.accepted_candidates;
      this.rejected_candidates = data.Data.rejected_candidates;
      this.totalrejection = (this.rejected_candidates / this.submitted_candidates)*100;
      this.study_wallet = data.Data.study.study_wallet;
      console.log(data.Data)
      console.log(data.Data.study.study_wallet)
    }
  });
}
  
getSubmittedCandidateInfo(id) {
  this.rest.getSubmittedCandidateInfo(id).subscribe((data: { message:any, Data: { submitted_candidate_list:any } }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.submitted_candidate_list = data.Data.submitted_candidate_list;
    }    
  });
}


acceptSubmittedStudy(user_id){
  this.study_id = this.route.snapshot.params['id'];
  this.rest.acceptSubmittedStudy(this.study_id,user_id).subscribe((data: { message: any }) => {
    if (data.message == 'study-accepted') {
      this.getSubmittedCandidateInfo(this.route.snapshot.params['id']); 
      this.toastr.success('Submission Accepted', 'Success!');
      this.router.navigateByUrl('/activestudydashboard/' +this.study_id);
    } else {
      this.getSubmittedCandidateInfo(this.route.snapshot.params['id']); 
      this.toastr.error('Study Not Accepted', 'Oops!');
      this.router.navigateByUrl('/activestudydashboard/' +this.study_id);
    } 
  });
}


rejectSubmitStudy(user_id){
  this.study_id = this.route.snapshot.params['id'];
  this.rest.rejectSubmitStudy(this.rejectsubmitstudy.value, this.study_id,user_id).subscribe((data: { message: any }) => {
    if (data.message == 'study-rejected') {
      $(".close").click();
      this.getSubmittedCandidateInfo(this.route.snapshot.params['id']); 
      this.toastr.success('Study Rejected', 'Success!');
      this.router.navigateByUrl('/activestudydashboard/' +this.study_id);
    } else if (data.message == 'you can not reject more than 5%') {
      $(".close").click();
      this.getSubmittedCandidateInfo(this.route.snapshot.params['id']); 
      this.toastr.warning('you can not reject more than 5%', 'Warning!');
      this.router.navigateByUrl('/activestudydashboard/' +this.study_id);
    } else {
      this.toastr.error('Study Not Rejected', 'Oops!');
      this.router.navigateByUrl('/activestudydashboard/' +this.study_id);
    } 
  });
}  
  
getAcceptCandidateInfo(id) {
  this.rest.getAcceptCandidateInfo(id).subscribe((data: { message:any, Data: { reaccepted_candidate_list:any, accepted_candidate_list:any ,rejected_candidate_list:any } }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.accepted_candidate_list = data.Data.accepted_candidate_list;
      this.rejected_candidate_list = data.Data.rejected_candidate_list;
      this.reaccepted_candidate_list = data.Data.reaccepted_candidate_list;
    }
  });
}


}
