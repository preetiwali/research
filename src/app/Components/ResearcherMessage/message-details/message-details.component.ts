import {Component, OnInit} from '@angular/core';
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


@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.sass']
})
export class MessageDetailsComponent implements OnInit {

  id:any;
  messages:any;
  message:any;
  research_worker_id:any;
  closeResult: string;
  message_id:any;

  htmlContent = '';

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

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getUserInfo();
    this.message_id = this.route.snapshot.params['id'] ;
    this.detailedMessage(this.route.snapshot.params['id']);
  }

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

  replymessage = new FormGroup({
    reciever_id: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  detailedMessage(id) {
    this.rest.detailedMessage(id).subscribe((data: {message:any, Data: { message:any } }) => {
    this.message = data.Data.message;
    }); 
  }

  getUserInfo() {
    const user_id = localStorage.getItem('user_id');
    this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:any } }) => {
    if (data.message === 'user-info') {
      this.research_worker_id = data.Data.user.research_worker_id;
    }
  });
 }

  replyMessage() {
    this.replymessage.value.sender_id = this.research_worker_id;
    this.rest.newMessage(this.replymessage.value).subscribe((data: { message: any }) => {
      if (data.message === 'message-sent') {
        $(".close").click();
        this.toastr.success('Message has been sent', 'Success!');
        this.router.navigateByUrl('/messagedetails/' +this.message_id);
      } else if (data.message === 'message-not-sent') {
        this.toastr.success('Message has not been sent', 'Success!');
        this.router.navigateByUrl('/messagedetails/' +this.message_id);
      } else {
        this.toastr.error('An error occured while sending message', 'Oops!');
        this.router.navigateByUrl('/messagedetails/' +this.message_id);
      }
    }); 
  }
}
