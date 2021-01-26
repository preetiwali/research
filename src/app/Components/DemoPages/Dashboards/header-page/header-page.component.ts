import { Component, OnInit , OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Color} from 'ng2-charts';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';


// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-header" *ngIf="this.login_count == 'first-login' && this.user_type == 'Participant'">
//       <h4 class="modal-title">Welcome to Winpower</h4>
//       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <p class="text-center">Welcome to Winpower</p>
//       <h6 class="text-center text-info" style="color:white;margin-top: 3%;">
//       <a routerLink="/helpcontent" target="_blank" style="text-decoration: none;"><button class="btn btn-info">Click here for help</button></a>
//       </h6>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//     </div>
//   `
// })

// export class NgbdModalContent {
//   @Input() name;

//   constructor(public activeModal: NgbActiveModal) {}
// }

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.sass']
})

export class HeaderPageComponent implements OnInit {
  
  message:any;
  categories:any;
  total_question:any;
  total_response:any;
  total:any;
  status:any;
  closeResult: string;
  user:any;
  user_type:any;
  login_count:any;


  @ViewChild('content') content: TemplateRef<any>;

  percentageValue: (value: number) => string;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { 
                this.percentageValue = function(value: number): string {
                  return `${Math.round(value)} / ${this.max}`;
                };
              }


  ngOnInit() {
    this.getFrontPage(); 
    this.getTotalCompleteQuestions();
    this.getUserInfo(this.route.snapshot.params['id']);
    // this.firstLogin();
    // const modalRef = this.modalService.open(NgbdModalContent);
    // modalRef.componentInstance.name = 'World';

  }

  // getfirstlogin(){
  //   if(this.login_count == 1){
  //     alert(this.login_count);
  //     $("#MyPopup").modal("show");
  //   }
  //   else{
  //     $("#MyPopup").modal("hide");
  //   }
  // }

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


  getFrontPage() {
    const user_id = localStorage.getItem('user_id');
    this.rest.getFrontPage(user_id).subscribe((data : {message:any}) => {
    this.message = data.message;
    });
  }

  
  getTotalCompleteQuestions() {
    this.rest.getCategoryUser().subscribe((data: { Data:any, message:any }) => {
      this.categories = data.Data.demographic_category;
      this.total_question = data.Data.total_question;
      this.total_response = data.Data.total_response;
      this.total =  (this.total_response / this.total_question)*100;
      this.status = data.message;
    });
  }


  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: { Data: { user:any}, message:any }) => {
    this.user = data.Data.user;
    this.user_type = this.user.user_type;
    this.login_count = data.Data.user.login_count;

    if(this.login_count == 1 && this.user_type == 'Participant'){
      this.modalService.open(this.content, {
        size: 'lg'});
    }

    // this.modalService.open(this.content, {
    //   size: 'lg'});

  });
 }


 changeLoginCount(){
  const user_id = localStorage.getItem('user_id');
  this.rest.changeLoginCount(user_id).subscribe((data: {message:any }) => {
      if(data.message === 'change-login-count'){
        location.reload();
        this.router.navigateByUrl('/');
      }
  });
 }


 closemodal(){
  $(".close").click();
  this.changeLoginCount();
 }
 


}
