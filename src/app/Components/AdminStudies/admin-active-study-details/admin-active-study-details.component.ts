import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-active-study-details',
  templateUrl: './admin-active-study-details.component.html',
  styleUrls: ['./admin-active-study-details.component.sass']
})
export class AdminActiveStudyDetailsComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

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
  paid_candidate_count:any;
  eligible_candidate_count:any;

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id'];
    this.getAdminStudyInfo(this.route.snapshot.params['id']); 
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
    
  getAdminStudyInfo(id) {
    this.rest.getAdminstudyInfo(id).subscribe((data: {message:any, Data: { study:any, accepted_candidate_count:any ,
              rejected_candidate_count:any ,required_participant:any,submitted_candidate_count:any, 
              active_candidate:any,submitted_candidate_list:any,eligible_candidate_count:any ,active_candidate_list:any,paid_candidate_count:any} }) => {
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
        this.paid_candidate_count = data.Data.paid_candidate_count;
        this.eligible_candidate_count = data.Data.eligible_candidate_count;
      }

    });
  }
}
