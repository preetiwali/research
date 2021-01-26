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
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.sass']
})
export class SentComponent implements OnInit {

  sender_id:any;
  messages:any;
  message:any;
  closeResult:string;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }

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
    this.sentMessage();
  }

  sentMessage() {
    this.sender_id = localStorage.getItem('user_id');
    this.rest.sentMessage(this.sender_id).subscribe((data: {message:any, Data: { messages:any } }) => {
      if (data.message == 'sent-mails') {
        this.messages = data.Data.messages;
        this.message = data.message;
      } else {
         this.message = data.message;
      }
    }); 
  }

  deleteMail(id) {
    this.rest.deleteMail(id).subscribe((data: { message: any }) => {
      if (data.message == 'message-deleted') {
        $(".close").click();
        this.router.navigateByUrl('/sentmessage');
        this.sentMessage();
      } else {
        $(".close").click();
        this.router.navigateByUrl('/sentmessage');
        this.sentMessage();
      }
    });
  }

  archiveMail(id) {
    this.rest.archiveMail(id).subscribe((data: { message: any }) => {
      if (data.message == 'message-archived') {
        this.router.navigateByUrl('/sentmessage');
        this.sentMessage();
      } else {
        this.router.navigateByUrl('/sentmessage');
        this.sentMessage();
      }
    });
  }
}
