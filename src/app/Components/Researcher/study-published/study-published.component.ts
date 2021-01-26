import {Component,AfterViewChecked, OnInit, ChangeDetectorRef,forwardRef} from '@angular/core';
import {environment} from './../../../../environments/environment';
import {Color} from 'ng2-charts/ng2-charts';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from './../../../payment.service';
import { CartService } from './../../../services/cart.service';
import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpParams} from '@angular/common/http';
import { helpers } from 'chart.js';
import { HttpClient } from '@angular/common/http';

// import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


// import { OnApproveData, OnApproveActions } from './../../../paypal/types/buttons';
// import { OnCancelData, OnErrorData } from './../../../paypal/types/buttons';
// import { PayPalProcessor, OnApprove, OrderRequest } from './../../../paypal';

declare let paypal:any;
@Component({
  selector: 'app-study-published',
  templateUrl: './study-published.component.html',
  styleUrls: ['./study-published.component.sass'],
  providers: [DatePipe]
})

export class StudyPublishedComponent implements OnInit {

// paypal
  // public payPalConfig?: IPayPalConfig;
// end paypal

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal, private paymentService: PaymentService,
    private cartService: CartService, private changeRef: ChangeDetectorRef,public datePipe: DatePipe, private http: HttpClient){ }


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
  totalPrice:any;
  payableAmount:any;
  study_wallet:any;

  showSuccess:boolean;

  //CyberSource Variables

  access_key:any;
  profile_id:any;
  unsigned_field_names: any;
  locale:any;
  transaction_type:any;
  reference_number:any;
  currency:any;
  transaction_uuid:any;
  signed_date_time:any;
  signature:any;
  bill_to_address_city:any;
  bill_to_address_line1:any;
  bill_to_company_name:any;
  bill_to_email:any;
  bill_to_forename:any;
  bill_to_phone:any;
  bill_to_surname:any;
  signed_field_names:any;

  all_params:any;

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
    this.WindowRef = this.paymentService.WindowRef;
    this.study_id = this.route.snapshot.params['id']
    this.getStudyInfo(this.route.snapshot.params['id']); 
    this.getUserInfo();
    // this.CybersourcePay();
    // paypal
  }


  getUserInfo() {
      const user_id = localStorage.getItem('user_id');
      this.user_id = user_id;
      this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:any } }) => {
      if (data.message === 'user-info') {
          // console.log('user data', data)
        
          // this.user_id = data.Data.user.id;
      }
    });
  }

  // Cyber Source

  CybersourcePay(){
    var signed_field_namess = [this.user_id, this.study_id]
    // console.log(signed_field_namess)
    if (localStorage.getItem('token') != null) {
        const token =  localStorage.getItem('token');
    }

    this.rest.getParamsInfo(signed_field_namess).subscribe((pramRes) => {
      // console.log(pramRes)

      if(pramRes){
        this.all_params = 1;
      }

      this.access_key = pramRes.Data.access_key;
      this.profile_id = pramRes.Data.profile_id;
      this.amount = pramRes.Data.amount;
      this.bill_to_address_city = pramRes.Data.bill_to_address_city;
      this.bill_to_address_line1 = pramRes.Data.bill_to_address_line1;
      this.bill_to_company_name = pramRes.Data.bill_to_company_name;
      this.bill_to_email = pramRes.Data.bill_to_email;
      this.bill_to_forename = pramRes.Data.bill_to_forename;
      this.bill_to_phone = pramRes.Data.bill_to_phone;
      this.bill_to_surname = pramRes.Data.bill_to_surname;
      this.currency = pramRes.Data.currency;
      this.locale = pramRes.Data.locale;
      this.reference_number = pramRes.Data.reference_number;
      this.signature = pramRes.Data.signature;
      this.signed_date_time = pramRes.Data.signed_date_time;
      this.signed_field_names = pramRes.Data.signed_field_names;
      this.transaction_type = pramRes.Data.transaction_type;
      this.transaction_uuid = pramRes.Data.transaction_uuid;
      this.unsigned_field_names = pramRes.Data.unsigned_field_names;

      // const token =  localStorage.getItem('token');
      // const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 
      //                                  'Access-Control-Allow-Origin' : '*', 
      //                                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      //                                 });

      // const formData = new HttpParams()
      // .set('access_key', pramRes.Data.access_key)
      // .set('amount', pramRes.Data.amount)
      // .set('bill_to_address_city', pramRes.Data.bill_to_address_city)
      // .set('bill_to_address_line1', pramRes.Data.bill_to_address_line1)
      // .set('bill_to_company_name', pramRes.Data.bill_to_company_name)
      // .set('bill_to_email', pramRes.Data.bill_to_email)
      // .set('bill_to_forename', pramRes.Data.bill_to_forename)
      // .set('bill_to_phone', pramRes.Data.bill_to_phone)
      // .set('bill_to_surname', pramRes.Data.bill_to_surname)
      // .set('currency', pramRes.Data.currency)
      // .set('locale', pramRes.Data.locale)
      // .set('profile_id', pramRes.Data.profile_id)
      // .set('reference_number', pramRes.Data.reference_number)
      // .set('signature', pramRes.Data.signature)
      // .set('signed_date_time', pramRes.Data.signed_date_time)
      // .set('signed_field_names', pramRes.Data.signed_field_names)
      // .set('transaction_type', pramRes.Data.transaction_type)
      // .set('transaction_uuid', pramRes.Data.transaction_uuid)
      // .set('unsigned_field_names', pramRes.Data.unsigned_field_names)

      // this.http.post<any>('https://testsecureacceptance.cybersource.com/pay', formData, { headers })
      //     // .subscribe(
      //     //             (res:any) => {
      //     //               window.location.href=res.url;
      //     //                 console.log(res);
      //     //             },
      //     //             err => console.log(err)
      //     //         );
      //     .subscribe({
      //       next: data => {
      //          console.log("Res"+ data);
               
      //       },
      //       error: (error:any) => {
      //         if(error.status == 200){
      //           window.location.href=error.url;
      //         } 
      //         console.log("Err"+ error);
      //       }
      //   })
    
    })
    
  }


// Cyber Source end



// paypal
// library paypal



// private initConfig(): void {
//   this.payPalConfig = {
//   currency: 'EUR',
//   clientId: 'AeaO4uvX9zR4Y2WJ52pMJE3y_IzRo3u6SWE1T91rX4nXlcIpcVt_PVeQmPS2Twx1eIAUax6ralrexePL',
//   createOrderOnClient: (data) => <ICreateOrderRequest>{
//     intent: 'CAPTURE',
//     purchase_units: [
//       {
//         amount: {
//           currency_code: 'EUR',
//           value: this.totalPrice,
//           breakdown: {
//             item_total: {
//               currency_code: 'EUR',
//               value: this.totalPrice
//             }
//           }
//         },
//         items: [
//           {
//             name: 'Enterprise Subscription',
//             quantity: '1',
//             category: 'DIGITAL_GOODS',
//             unit_amount: {
//               currency_code: 'EUR',
//               value: this.totalPrice,
//             },
//           }
//         ]
//       }
//     ]
//   },
//   advanced: {
//     commit: 'true'
//   },
//   style: {
//     label: 'paypal',
//     layout: 'vertical'
//   },
//   onApprove: (data, actions) => {
//     console.log('onApprove - transaction was approved, but not authorized', data, actions);
//     actions.order.get().then(details => {
//       console.log('onApprove - you can get full order details inside onApprove: ', details);
//       this.studyPayement(this.study_id,details);
//     });
//   },
//   onClientAuthorization: (data) => {
//     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//     this.showSuccess = true;
//   },
//   onCancel: (data, actions) => {
//     console.log('OnCancel', data, actions);
//   },
//   onError: err => {
//     console.log('OnError', err);
//   },
//   onClick: (data, actions) => {
//     console.log('onClick', data, actions);
//   },
// };
// }

// medium paypal

  // width = 220;
  // height = 35;
  // shape = 'rect';
  // color = 'gold'; 
  // label = 'paypal';
  // layout = 'vertical';

  // order: OrderRequest = {
  //   intent: 'CAPTURE', 
  //   purchase_units: [{
  //     custom_id: 'wallet10',
  //     amount: {
  //       currency_code: 'EUR',
  //       value: this.totalPrice
  //     }
  //   }]
  // };

  // onApprove(data: OnApproveData, actions: OnApproveActions) {
    
  //   console.log('Transaction Approved:', data);

  //   // Captures the trasnaction
  //   return actions.order.capture().then(details => {

  //     console.log('Transaction completed by', details);
  //     this.studyPayement(this.study_id,details);

  //     // Call your server to handle the transaction
  //     return Promise.reject('Transaction aborted by the server');
  //   });
  // }

  // onCancel(data: OnCancelData) {

  //   console.log('Transaction Cancelled:', data); 
  // }

  // onError(data: OnErrorData) { 

  //   console.log('Transaction Error:', data); 
  // }

// end paypal





// razorpay
  products: any[] = [];
  objectKeys = Object.keys;
  quantity = 0;
  // payableAmount = 0;
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
        this.filteredCandidateCount = data.Data.filtered_candidates_count;
        this.is_paid = data.Data.study.is_paid || 0;
        this.reward = this.study.reward;
        this.submission = this.study.submission;
        this.totalPrice = (this.reward * this.submission * 1.30).toFixed(2) ;
        this.payableAmount =  parseInt(this.totalPrice) ;
        // this.payableAmount =  this.totalPrice.toString();
        this.totalPrice = this.totalPrice.toString();
        this.study_wallet = data.Data.study.study_wallet;

        this.studydescription = data.Data.study;
        $('study').contents().find('.angular-editor-textarea').append('<div class="angular-editor-textarea" id="editor" contenteditable="true" translate="no" spellcheck="false" style="height: 15rem; min-height: 5rem;">' + this.studydescription + '</div>');
        this.study = data.Data.study;
        this.max_participation_date = this.datePipe.transform(this.study.max_participation_date,'yyyy-MM-dd');
        this.description_size  = data.Data.description_size;

        if(this.is_paid == 0){
          this.CybersourcePay()
        }

      }
    });
  }
  

  studyPayement(id,response){
    this.rest.studyPayement(id,response).subscribe((data: { message: any }) => {
      if (data.message == 'payment-done') {
        this.getStudyInfo(this.route.snapshot.params['id']); 
        // $('.proceed_btn').removeClass('pointer_event_none');
        // this.getStudyInfo(this.route.snapshot.params['id']); 
        this.router.navigateByUrl('/studypublished/' +this.study_id);
    } else {
        this.router.navigateByUrl('/studypublished/' +this.study_id);
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
      this.router.navigateByUrl('/studypublished/' +data.Data.id);
    } else {
      this.toastr.error('Study is not Updated', 'Oops!');
      this.router.navigateByUrl('/studypublished/'+data.Data.id);
    }
  });
}


greaterTimeFunction(){
  if(this.editstudyform.value.estimatetime <=  this.editstudyform.value.allowedtime){
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


validateEstimateTime(){
  if(this.editstudyform.value.estimatetime < 1){
    document.getElementById("estimatetime").classList.remove("ng-valid");
    document.getElementById("estimatetime").classList.remove("is-valid");

    document.getElementById("estimatetime").classList.add("ng-invalid");
    document.getElementById("estimatetime").classList.add("is-invalid");
    
  } else {
    document.getElementById("estimatetime").classList.remove("ng-invalid");
    document.getElementById("estimatetime").classList.remove("is-invalid");

    document.getElementById("estimatetime").classList.add("ng-valid");
    document.getElementById("estimatetime").classList.add("is-valid");
  }
}


editStudyDescription(id) {
  this.editstudydescription.value.id = id;
  this.rest.studyDescription(this.editstudydescription.value).subscribe((data: { message: any, Data: any }) => {
    if (data.message == 'description-added') {
      $(".close").click();
        this.getStudyInfo(this.route.snapshot.params['id']); 
        this.toastr.success('Study Description Updated', 'Success!');
        this.router.navigateByUrl('/studypublished/' +data.Data.id);
    }else if(data.message === 'insufficient-length'){
      $('#description').css('display','block');  
    } else {
      // this.toastr.error('Study Description is not Updated', 'Oops!');
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
    this.payableAmount =  parseInt(this.totalPrice) ;
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
          "name": ``
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
        // this.payment_detail.payment_id = response.razorpay_payment_id;
        // this.payment_detail.amount = this.payableAmount;
        // this.payment_detail.order_id = response.order_id;
        this.studyPayement(this.study_id,response);
        // this.getStudyInfo(this.route.snapshot.params['id']);
        },
      error => {
        this.paymentResponse = error;
      });
  }

  
}
