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

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

declare let paypal:any;

@Component({
  selector: 'app-wallet-participant',
  templateUrl: './wallet-participant.component.html',
  styleUrls: ['./wallet-participant.component.sass']
})
export class WalletParticipantComponent implements OnInit {

  // paypal
  public payPalConfig?: IPayPalConfig;
  // end paypal

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
    reward: any;
    study: any;
    user_id:any;
    message:any;
    showSuccess:boolean;


  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
    this.WindowRef = this.paymentService.WindowRef;
    this.user_id = localStorage.getItem('user_id');
    this.getParticipantStudyInfo(this.user_id);

    this.initConfig();

  }


  // paypal
// library paypal



private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'AeaO4uvX9zR4Y2WJ52pMJE3y_IzRo3u6SWE1T91rX4nXlcIpcVt_PVeQmPS2Twx1eIAUax6ralrexePL',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: this.totalPrice,
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: this.totalPrice
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: this.totalPrice,
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then(details => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
      this.studyPayementParticipant(details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}


  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: { Data: { user:{ wallet:any },image_url:any } }) => {
    this.user = data.Data.user;
    this.wallet = this.user.wallet;
    this.totalPrice = this.wallet * 100;
  });
 } 


 getParticipantStudyInfo(user_id) {
  this.rest.getParticipantStudyInfo(user_id).subscribe((data: { message:any, Data: { studies:any } }) => {
    this.reward = data.Data.studies.eligible_study.reward;
    this.message = data.message;
  });
}



 validAmount(){
  if(this.paymentprocess.value.amount <=  this.wallet && this.paymentprocess.value.amount >= 50){
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


 studyPayementParticipant(response){
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
      this.studyPayementParticipant(response);
      },
    error => {
      this.paymentResponse = error;
    });
  }

}
