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
  selector: 'app-active-study-details',
  templateUrl: './active-study-details.component.html',
  styleUrls: ['./active-study-details.component.sass'],
  providers: [DatePipe]
})
export class ActiveStudyDetailsComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,private formBuilder: 
              FormBuilder,private modalService: NgbModal ,private toastr: ToastrService, public datePipe: DatePipe) { }

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

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
  

  ngOnInit() {
    this.new_date = new Date();
    this.min_to_date = this.datePipe.transform(this.new_date, 'yyyy-MM-dd'); 
    this.getResearcherStudyInfo(this.route.snapshot.params['id']); 
  }


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

  editDateform = new FormGroup({
    max_participation_date: new FormControl('', Validators.required)
  });


  editDate(id) {
    this.rest.editStudy(this.editDateform.value, id).subscribe((data: { message: any, Data:any }) => {
      if (data.message == 'study-updated') {
        $(".close").click();
        this.getResearcherStudyInfo(this.route.snapshot.params['id']); 
        this.toastr.success('Study Updated', 'Success!');
        this.router.navigateByUrl('/researcheractivestudyDetails/' +data.Data.id);
      } else {
        this.toastr.error('Study is not Updated', 'Oops!');
        this.router.navigateByUrl('/researcheractivestudyDetails/'+data.Data.id);
      }
    });
  }

    
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
  

  acceptSubmittedStudy(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.acceptSubmittedStudy(this.study_id,user_id).subscribe((data: { message: any }) => {
      if (data.message == 'study-accepted') {
        this.getResearcherStudyInfo(this.route.snapshot.params['id']); 
        this.toastr.success('Study Accepted', 'Success!');
        this.router.navigateByUrl('/researcheractivestudyDetails/' +this.study_id);
      } else {
        this.toastr.error('Study Not Accepted', 'Oops!');
        this.router.navigateByUrl('/researcheractivestudyDetails/' +this.study_id);
      } 
    });
  }

  rejectSubmitStudy(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.rejectSubmitStudy(this.rejectsubmitstudy.value, this.study_id,user_id).subscribe((data: { message: any }) => {
      if (data.message == 'study-rejected') {
        $(".close").click();
        this.getResearcherStudyInfo(this.route.snapshot.params['id']); 
        this.toastr.success('Study Rejected', 'Success!');
        this.router.navigateByUrl('/researcheractivestudyDetails/' +this.study_id);
      } else {
        this.toastr.error('Study Not Rejected', 'Oops!');
        this.router.navigateByUrl('/researcheractivestudyDetails/' +this.study_id);
      } 
    });
  }

  republishStudy(id) {
    this.rest.republishStudy(id).subscribe((data: { message:any }) => {
      if(data.message = "study-republished"){
        $(".close").click();
        this.toastr.success('Study Republished', 'Success!');
        this.getResearcherStudyInfo(this.route.snapshot.params['id']); 
      }
    });
  }


  copyStudy(id){
    this.rest.copyStudy(id).subscribe((data: { Data:any, message:any }) => {
      if(data.message = "study-copied"){
        this.new_study_id = data.Data.id;
        this.toastr.success('Study Copied', 'Success!');
        this.router.navigateByUrl('/studypublished/' + this.new_study_id);      }
    });
  }
}
