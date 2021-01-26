import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup,FormArray, Validators} from '@angular/forms';
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
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.sass']
})
export class AdminTransactionComponent implements OnInit {

  transaction:any;
  total_transaction:any;
  total_payment:any;
  months:any;
  monthly_transaction:any;
  monthly_payment:any;
  total_indian_payment:any;
  total_uae_payment:any;
  total_other_country_payment:any;
  total:any;
  payment_array:any;
  indian_transactions:any;
  uae_transactions:any;
  other_country_transactions:any;
  @ViewChild('chart') chart: ChartComponent;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) {}

  ngOnInit() {
    this.getAdminTransactionDetails(); 
  }

  getAdminTransactionDetails() {
    this.rest.getAdminTransactionDetails().subscribe((data: { message:any, Data: {transactions:any,total_transaction:any
      uae_transactions:any,other_country_transactions:any,total_other_country_payment:any,total_uae_payment:any,indian_transactions:any,payment_array:any, total_indian_payment:any, total_payment:any, month:any, monthly_transaction:any, monthly_payment:any} }) => {
    if(data.message == 'unauthorised-user'){
    this.router.navigateByUrl('/');
    }else{
    this.transaction = data.Data.transactions;
    this.total_transaction = data.Data.total_transaction;
    this.total_payment = data.Data.total_payment;
    this.months = data.Data.month;
    this.monthly_transaction = data.Data.monthly_transaction;
    this.monthly_payment = data.Data.monthly_payment;
    this.total_indian_payment = data.Data.total_indian_payment;
    this.total_uae_payment = data.Data.total_uae_payment;
    this.total_other_country_payment = data.Data.total_other_country_payment;
    this.payment_array = data.Data.payment_array;
    this.indian_transactions = data.Data.indian_transactions;
    this.uae_transactions = data.Data.uae_transactions;
    this.other_country_transactions = data.Data.other_country_transactions;

    }
  });
  }
}
