import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pause-study-edit',
  templateUrl: './pause-study-edit.component.html',
  styleUrls: ['./pause-study-edit.component.sass'],
  providers: [DatePipe]
})
export class PauseStudyEditComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService ,private modalService: NgbModal,public datePipe: DatePipe)
     { }

  htmlContent = '';

  gaugeValues: any = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50
  };

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

  study:any;
  required_participant:any;
  active_candidate:any;
  candidateInfo:any
  unpublishedstudy:any;
  closeResult: string;
  user_id:any;
  filteredCandidateCount:any;
  is_paid:any;
  study_id:any
  submission:any;
  studydescription:any;
  max_participation_date:any;
  min_to_date:any;
  greaterTime:boolean = false;


  ngOnInit() {
    const new_date = new Date();
    this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd');
    this.study_id = this.route.snapshot.params['id']
    this.getStudyInfo(this.route.snapshot.params['id']); 
  }
    
  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { message:any, Data: {filtered_candidates_count:any, study:any, is_paid:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.submission = data.Data.study.submission;
        this.study = data.Data.study;
        this.filteredCandidateCount = data.Data.filtered_candidates_count;
        this.is_paid = data.Data.study.is_paid;
        this.studydescription = data.Data.study;
        $('study').contents().find('.angular-editor-textarea').append('<div class="angular-editor-textarea" id="editor" contenteditable="true" translate="no" spellcheck="false" style="height: 15rem; min-height: 5rem;">' + this.studydescription + '</div>');
        this.study = data.Data.study;
        this.max_participation_date = this.datePipe.transform(this.study.max_participation_date,'yyyy-MM-dd');
      }
    });
  }

  editstudydescription = new FormGroup({
    description: new FormControl('')
  });

  editstudyform = new FormGroup({
    completionurl: new FormControl('', Validators.required),
    completioncode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    studyurl: new FormControl('', Validators.required),
    allowedtime: new FormControl('', Validators.required),
    estimatetime: new FormControl('', Validators.required),
    submission: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    max_participation_date: new FormControl('', Validators.required)
  });


  editStudy(id) {
    this.rest.editStudy(this.editstudyform.value, id).subscribe((data: { message: any, Data:any }) => {
      if (data.message == 'study-updated') {
        $(".close").click();
          this.getStudyInfo(this.route.snapshot.params['id']); 
          this.toastr.success('Study Updated', 'Success!');
          this.router.navigateByUrl('/editpausestudy/' +data.Data.id);
      } else {
        this.toastr.error('Study is not Updated', 'Oops!');
        this.router.navigateByUrl('/editpausestudy/'+data.Data.id);
      }
    });
  }


  editStudyDescription(id) {
    this.editstudydescription.value.id = id;
    this.rest.studyDescription(this.editstudydescription.value).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'description-added') {
          $(".close").click();
          this.getStudyInfo(this.route.snapshot.params['id']); 
          this.toastr.success('Study Description Updated', 'Success!');
          this.router.navigateByUrl('/editpausestudy/' +data.Data.id);
      } else if(data.message === 'insufficient-length'){
        $('#description').css('display','block');  
      } else {
        // this.toastr.error('Study Description is not Updated', 'Oops!');
      }
    });
  }

}
