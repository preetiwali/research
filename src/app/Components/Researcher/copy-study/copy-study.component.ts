import {Component,AfterViewChecked, OnInit, ChangeDetectorRef} from '@angular/core';
import {environment} from './../../../../environments/environment';
import {Color} from 'ng2-charts/ng2-charts';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from './../../../payment.service';
import { CartService } from './../../../services/cart.service';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-copy-study',
  templateUrl: './copy-study.component.html',
  styleUrls: ['./copy-study.component.sass'],
  providers: [DatePipe]
})
export class CopyStudyComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal,
   public datePipe: DatePipe){ }


  htmlContent = '';
  closeResult: string;
  study:any;
  required_participant:any;
  active_candidate:any;
  candidateInfo:any
  unpublishedstudy:any;
  user_id:any;
  filteredCandidateCount:any;
  is_paid:any;
  study_id:any
  submission:any;
  reward:any;
  payment_id:any;
  amount:any;
  min_to_date:any;
  greaterTime:boolean = false;

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
    const new_date = new Date();
    this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd');
    this.study_id = this.route.snapshot.params['id']
    this.getStudyInfo(this.route.snapshot.params['id']); 
    // this.totalPrice = this.reward * this.submission* 1.30 ;
  }

// razorpay
  products: any[] = [];
  objectKeys = Object.keys;
  totalPrice:any;
  quantity = 0;
  payableAmount = 0;
  WindowRef: any;
  processingPayment: boolean;
  paymentResponse:any = {};
  payment_detail:any = {};
  studydescription:any;
  max_participation_date:any;
  description_size:any;

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

  
  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { message:any, Data: {filtered_candidates_count:any,description_size:any, study:any, is_paid:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.submission = data.Data.study.submission;
        this.study = data.Data.study;
        // this.filteredCandidate = data.Data.filtered_candidates;
        this.filteredCandidateCount = data.Data.filtered_candidates_count;
        this.is_paid = data.Data.study.is_paid;
        this.reward = this.study.reward;
        this.submission = this.study.submission;
        this.totalPrice = this.reward * this.submission * 1.30 * 100 ;
        this.studydescription = data.Data.study;
        $('study').contents().find('.angular-editor-textarea').append('<div class="angular-editor-textarea" id="editor" contenteditable="true" translate="no" spellcheck="false" style="height: 15rem; min-height: 5rem;">' + this.studydescription + '</div>');
        this.study = data.Data.study;
        this.max_participation_date = this.datePipe.transform(this.study.max_participation_date,'yyyy-MM-dd');
        this.description_size  = data.Data.description_size;
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
        this.router.navigateByUrl('/copystudy/' +data.Data.id);
      } else {
        this.toastr.error('Study is not Updated', 'Oops!');
        this.router.navigateByUrl('/copystudy/'+data.Data.id);
      }
    });
  }


  greaterTimeFunction(){
    if(this.editstudyform.value.estimatetime <=  this.editstudyform.value.allowedtime){
      // $('#description').css('display','block');
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


  editStudyDescription(id) {
    this.editstudydescription.value.id = id;
    this.rest.studyDescription(this.editstudydescription.value).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'description-added') {
        $(".close").click();
          this.getStudyInfo(this.route.snapshot.params['id']); 
          this.toastr.success('Study Description Updated', 'Success!');
          this.router.navigateByUrl('/copystudy/' +data.Data.id);
      }else if(data.message === 'insufficient-length'){
        $('#description').css('display','block');  
      } else {
        // this.toastr.error('Study Description is not Updated', 'Oops!');
        // this.router.navigateByUrl('/editstudydescription/'+data.Data.id);
      }
    });
  }

}
