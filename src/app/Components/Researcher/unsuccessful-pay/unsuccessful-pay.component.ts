import {Component,AfterViewChecked, OnInit, ChangeDetectorRef,forwardRef} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Color} from 'ng2-charts/ng2-charts';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../user';
import { AuthService } from '../../../auth.service';
import {ApiService} from '../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../payment.service';
import { CartService } from '../../../services/cart.service';
import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpParams} from '@angular/common/http';
import { helpers } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';


@Component({
    selector: 'app-unsuccessful-pay',
    templateUrl: './unsuccessful-pay.component.html',
    styleUrls: ['./unsuccessful-pay.component.sass'],
    providers: [DatePipe]
  })
  
  export class UnSuccessfulPayComponent implements OnInit {

    constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
        private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal, private paymentService: PaymentService,
        private cartService: CartService, private changeRef: ChangeDetectorRef,public datePipe: DatePipe, private http: HttpClient){ }
    
      
      study:any;
      user_id:any;
      study_id:any;
      min_to_date:any;
  


      products: any[] = [];
      objectKeys = Object.keys;
      quantity = 0;
    //   WindowRef: any;
      processingPayment: boolean;
      paymentResponse:any = {};
      payment_detail:any = {};
      studydescription:any;
      max_participation_date:any;
      description_size:any;

    ngOnInit() {
        const new_date = new Date();
        this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd');
        this.study_id = this.route.snapshot.params['id'];
    }
    
  }
    
