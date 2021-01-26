import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-study-submit-list-admin',
  templateUrl: './study-submit-list-admin.component.html',
  styleUrls: ['./study-submit-list-admin.component.sass']
})
export class StudySubmitListAdminComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal,private toastr: ToastrService) { }

  submitted_candidate_list:any;
  study_id:any;
  closeResult: string;

  ngOnInit() {
    this.getSubmittedCandidateInfo(this.route.snapshot.params['id']); 
    this.study_id = this.route.snapshot.params['id'];
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

  getSubmittedCandidateInfo(id) {
    this.rest.getSubmittedCandidateInfo(id).subscribe((data: {message:any, Data: { submitted_candidate_list:any } }) => {
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
      this.toastr.success('Study Accepted', 'Success!');
      this.router.navigateByUrl('/adminsubmitstudylist/' +this.study_id);
    } else {
      this.toastr.error('Study Not Accepted', 'Oops!');
      this.router.navigateByUrl('/adminsubmitstudylist/' +this.study_id);
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
      this.router.navigateByUrl('/adminsubmitstudylist/' +this.study_id);
    } else {
      this.toastr.error('Study Not Rejected', 'Oops!');
      this.router.navigateByUrl('/adminsubmitstudylist/' +this.study_id);
    } 
    });
  }
}
