import {Component,AfterViewChecked, OnInit, ChangeDetectorRef} from '@angular/core';
import {environment} from './../../../../../environments/environment';
import {Color} from 'ng2-charts/ng2-charts';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../user';
import {ApiService} from './../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from './../../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from './../../../../payment.service';
import { CartService } from './../../../../services/cart.service';

@Component({
  selector: 'app-wallet-researcher',
  templateUrl: './wallet-researcher.component.html',
  styleUrls: ['./wallet-researcher.component.sass']
})
export class WalletResearcherComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal, private paymentService: PaymentService,
    private cartService: CartService, private changeRef: ChangeDetectorRef){ }

    wallet:any;
    user:any;
    validpayment:any;

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


  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
    this.WindowRef = this.paymentService.WindowRef;
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: { Data: { user:{ wallet:any },image_url:any } }) => {
    this.user = data.Data.user;
    this.wallet = this.user.wallet;
    this.totalPrice = this.wallet * 100;
  });
 }

 validAmount(){
  if(this.paymentprocess.value.amount <=  this.wallet && this.paymentprocess.value.amount >= 0){
    this.validpayment = true;
    document.getElementById("amount").classList.remove("ng-invalid");
    document.getElementById("amount").classList.remove("is-invalid");

    document.getElementById("amount").classList.add("ng-valid");
    document.getElementById("amount").classList.add("is-valid");
  } else {
    this.validpayment = false;
    document.getElementById("amount").classList.remove("ng-valid");
    document.getElementById("amount").classList.remove("is-valid");

    document.getElementById("amount").classList.add("ng-invalid");
    document.getElementById("amount").classList.add("is-invalid");
  }
}

 paymentprocess = new FormGroup({
  amount: new FormControl('')
});  


 studyPayementResearcher(response){
  response.amount = this.paymentprocess.value.amount
    this.rest.studyPayementParticipant(response).subscribe((data: { message: any }) => {
      if (data.message == 'cash-out') {
        this.processingPayment = false;
        this.paymentprocess.reset();
        this.toastr.success('Cashout successful', 'Success!');
        this.getUserInfo(this.route.snapshot.params['id']);
    } else {
        this.paymentprocess.reset();
        this.processingPayment = false;
        this.toastr.error('Cashout unsuccessful', 'Oops!');
        this.getUserInfo(this.route.snapshot.params['id']);
      }
    });
  }

  // razorpay 

  getValue(object) {
    const key = this.objectKeys(object);
    return object[key.toString()];
  }

  proceedToPay($event) {
    this.processingPayment = true;
    this.payableAmount =  parseInt(this.paymentprocess.value.amount) * 100 ;
    $('.proceed_btn').addClass('pointer_event_none');
    this.initiatePaymentModal($event);
  }

  initiatePaymentModal(event) {
    let receiptNumber = `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
    let orderDetails = {
      amount: this.payableAmount,
      receipt: receiptNumber
    }

  this.paymentService.createOrder(orderDetails)
    .subscribe(order => {
    console.log("TCL: CheckoutComponent -> initiatePaymentModal -> order", order)
      var rzp1 = new this.WindowRef.Razorpay(this.preparePaymentDetails(order));
      this.processingPayment = true;
      rzp1.open(); 
      event.preventDefault();
    }, error => {
    console.log("TCL: CheckoutComponent -> initiatePaymentModal -> error", error)
    })
  }


  preparePaymentDetails(order){
    var ref = this;
    return  {
      "key":'rzp_test_CGbO2pLW9aFgFk',
      "amount": this.payableAmount,
      "name": 'Pay',
      "currency": order.currency,
      "order_id": order.id,
      "handler": function (response){
        ref.handlePayment(response);
      },
      "prefill": {
          "name": `Angular Geeks`
      },
      "theme": {
          "color": "#2874f0"
      }
      };
    }
    
    
    handlePayment(response) {
    this.paymentService.capturePayment({
      amount: this.payableAmount,
      payment_id: response.razorpay_payment_id
    })
    .subscribe(res => {
      this.paymentResponse = res;
      this.changeRef.detectChanges();
      this.studyPayementResearcher(response);
      },
    error => {
      this.paymentResponse = error;
    });
  }

}
