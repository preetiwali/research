import { Component, OnInit, ViewChild } from '@angular/core';
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
import {ChartComponent} from 'ng-apexcharts';



@Component({
  selector: 'app-participant-transctions',
  templateUrl: './participant-transctions.component.html',
  styleUrls: ['./participant-transctions.component.sass']
})
export class ParticipantTransctionsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

  transaction:any;
  total_payment:any;
  month:any;
  monthly_payment:any;

  ngOnInit() {
    this.getParticipantTransactionDetails(); 
  }

  getParticipantTransactionDetails() {
    this.rest.getParticipantTransactionDetails().subscribe((data: { message:any, Data: {transactions:any,total_payment:any,month:any,monthly_payment:any } }) => {
    if(data.message == 'unauthorised-user'){
    this.router.navigateByUrl('/');
    }else{
    this.transaction = data.Data.transactions;
    console.log(this.transaction)
    this.total_payment = data.Data.total_payment;
    this.month = data.Data.month;
    this.monthly_payment = data.Data.monthly_payment;
    }
  });
}

}
