import { Component, OnInit } from '@angular/core';
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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';


@Component({
  selector: 'app-participantarchive',
  templateUrl: './participantarchive.component.html',
  styleUrls: ['./participantarchive.component.sass']
})
export class ParticipantarchiveComponent implements OnInit {

  reciver_id:any;
  messages:any;
  message:any;
  closeResult:string;

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

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }
  ngOnInit() {
    this.archiveMessage();
  }

  deleteArchiveMail(id) {
    this.rest.deleteArchiveMail(id).subscribe((data: { message: any }) => {
      if (data.message == 'message-deleted') {
        $(".close").click();
        this.router.navigateByUrl('/archivemessage');
        this.archiveMessage();
      } else {
        $(".close").click();
        this.router.navigateByUrl('/archivemessage');
        this.archiveMessage();
      }
    });
  }

  archiveMessage() {
    this.reciver_id = localStorage.getItem('user_id');
    this.rest.archiveMessage(this.reciver_id).subscribe((data: {message:any, Data: { messages:any } }) => {
      this.messages = data.Data.messages;
      this.message = data.message;
    }); 
  }
}
