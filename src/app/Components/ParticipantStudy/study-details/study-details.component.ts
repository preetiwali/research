import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Color} from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { TemplateRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-study-details',
  templateUrl: './study-details.component.html',
  styleUrls: ['./study-details.component.sass'],
  providers: [DatePipe]
})


export class StudyDetailsComponent implements OnInit {

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
  user:any;
  required_participant:any;
  active_candidate:any;
  is_attempted:any;
  studyurl:any;
  timer:any;
  study_status:any;
  allowedtime:any;
  datePipeString:any;
  now:any;
  endtime:any;
  endtime1:any;
  demo:any;
  s:any;
  closeResult: string;
  seconds:any

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService, public datePipe: DatePipe,private modalService: NgbModal) { 
    }

  // @ViewChild('content') content: TemplateRef<any>;


  ngOnInit() {
    this.now = new Date();
    this.getParticipantStudyDetail(this.route.snapshot.params['id']); 
  }

  // openLarge(content) {
  //   this.modalService.open(content, {
  //     size: 'lg'
  //   });
  // }


  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

 
  
  getParticipantStudyDetail(id) {
    this.rest.getParticipantStudyDetail(id).subscribe((data: { Data: {study_status:any, study:any, timer:any, required_participant:any, active_candidate:any, is_attempted:any } }) => {
    this.study = data.Data.study;
    this.allowedtime = data.Data.study.allowedtime;
    this.studyurl = data.Data.study.studyurl;
    this.is_attempted = data.Data.is_attempted;
    this.required_participant = data.Data.required_participant;
    this.active_candidate = data.Data.active_candidate;
    this.timer = data.Data.timer ;
    this.datePipeString = this.datePipe.transform(this.timer,'yyyy-MM-dd HH:mm:ss') ;
    this.s = new Date(this.timer).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

    this.seconds = this.allowedtime * 60;

    // this.endtime = new Date(this.timer);
    // this.demo = this.endtime.toLocaleString();
    // this.endtime1 = this.datePipeString.getTime();
    // this.endtime = this.now.getTime();
    // this.demo = this.endtime - this.endtime1;
    console.log(this.s);
    console.log(this.timer);
    console.log(this.datePipeString);

    this.study_status = data.Data.study_status;

    // this.modalService.open(this.content, {
    //   size: 'lg'});

    });
  } 

  // yourOwnFunction() {
  //   // alert("jkdsja")
  //   window.location.reload();
  // }

  attemptStudy(id,studyurl){
    this.rest.attemptStudy(id).subscribe((data: {message:any}) => { 

    if (data.message == 'study-attempted') {
      window.open( studyurl,"_blank");
      this.getParticipantStudyDetail(this.route.snapshot.params['id']);
    } else {
      this.toastr.error('Maximum Attempt Completed', 'Oops!');
      this.getParticipantStudyDetail(this.route.snapshot.params['id']);
      this.router.navigateByUrl('/participantstudydetails/' +id);
    }
  });    
}

  submitStudy(id){
    this.rest.submitStudy(id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'study-submitted') {
        this.getParticipantStudyDetail(this.route.snapshot.params['id']); 
        this.toastr.success('Study Submitted', 'Success!');
        this.router.navigateByUrl('/participantstudydetails/' +id);
      } else {
        this.toastr.error('Study Not Submitted', 'Oops!');
        this.router.navigateByUrl('/participantstudydetails/' +id);
      }
    });
  }
}