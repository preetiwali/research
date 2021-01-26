import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';


@Component({
  selector: 'app-active-study',
  templateUrl: './active-study.component.html',
  styleUrls: ['./active-study.component.sass']
})
export class ActiveStudyComponent implements OnInit {

  unpublishedstudy: any;
  study: any;
  user_id:any;
  closeResult: string;
 
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    
    this.user_id = localStorage.getItem('user_id');
    this.getActiveStudy(this.user_id);

    
  }

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

  getActiveStudy(user_id) {
    this.rest.getAllActiveStudy(user_id).subscribe((data: {message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.unpublishedstudy = data.Data;
      }
    });
  }

  deleteStudyInfo(id){
    this.rest.deleteStudy(id).subscribe((data: { message: any }) => {
    if (data.message == 'study-deleted') {
    this.getActiveStudy(this.user_id);
        this.toastr.success('Study Deleted', 'Success!');
        this.router.navigateByUrl('/studyactive');
      } else {
        this.toastr.error('Study not Deleted', 'Oops!');
        this.router.navigateByUrl('/studyactive');
      } 
    });
  }


  completeStudy(id){
    this.rest.completeStudy(id).subscribe((data: { message: any }) => {
    if (data.message == 'study-completed') {
      this.getActiveStudy(this.user_id);
      this.toastr.success('Study Completed', 'Success!');
      this.router.navigateByUrl('/studyactive');
    } else if (data.message == 'all-participant-not-accepted') {
        this.getActiveStudy(this.user_id);
        this.toastr.warning('All participants studies not accepted to complete the study!', 'Warning!');
        this.router.navigateByUrl('/studyactive');
    } else {
        this.toastr.error('Study not Completed', 'Oops!');
        this.router.navigateByUrl('/studyactive');
      } 
    });
  }


  stopStudy(id){
    this.rest.toStopStudy(id).subscribe((data: { message: any }) => {
    if (data.message == 'study-stopped') {
        this.getActiveStudy(this.user_id);
        $(".close").click();
        this.toastr.success('Study Stopped', 'Success!');
        this.router.navigateByUrl('/studyactive');
      } else {
        $(".close").click();
        this.toastr.error('An error occured to stop study', 'Oops!');
        this.router.navigateByUrl('/studyactive');
      } 
    });
  }


  pauseStudy(id){
    this.rest.pauseStudy(id).subscribe((data: { message: any }) => {
    if (data.message == 'study-paused') {
      this.getActiveStudy(this.user_id);
        this.toastr.success('Study Pause', 'Success!');
        this.router.navigateByUrl('/studyactive');
      } else {
        this.toastr.error('Study not Pause', 'Oops!');
        this.router.navigateByUrl('/studyactive');
      } 
    });
  }


  resumeStudy(id){
    this.rest.resumeStudy(id).subscribe((data: { message: any }) => {
    if (data.message == 'study-resumed') {
    this.getActiveStudy(this.user_id);
        this.toastr.success('Study Reactivated', 'Success!');
        this.router.navigateByUrl('/studyactive');
      } else {
        this.toastr.error('Study not Reactivated', 'Oops!');
        this.router.navigateByUrl('/studyactive');
      } 
    });
  }

  

}
