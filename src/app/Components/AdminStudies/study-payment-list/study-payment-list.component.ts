import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-study-payment-list',
  templateUrl: './study-payment-list.component.html',
  styleUrls: ['./study-payment-list.component.sass']
})
export class StudyPaymentListComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private modalService: NgbModal) { }

  paymentdetails:any;
  study_id:any;

  ngOnInit() {
    this.getStudyPaymentInfo(this.route.snapshot.params['id']); 
    this.study_id = this.route.snapshot.params['id'];
  }

    
  getStudyPaymentInfo(id) {
    this.rest.getStudyPaymentInfo(id).subscribe((data: { message:any, Data: { paid_candidate_list:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.paymentdetails = data.Data.paid_candidate_list;
      }
      
    });
  }
}
