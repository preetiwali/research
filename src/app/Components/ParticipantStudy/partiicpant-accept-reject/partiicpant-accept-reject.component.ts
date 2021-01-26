import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-partiicpant-accept-reject',
  templateUrl: './partiicpant-accept-reject.component.html',
  styleUrls: ['./partiicpant-accept-reject.component.sass']
})
export class PartiicpantAcceptRejectComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }


    accept_Study_list:any;
    user_id:any;
  

    ngOnInit() {
  
     this.getAcceptStudyInfo(this.route.snapshot.params['id']);
     this.user_id =  this.route.snapshot.params['id'];
    
    }
      
    getAcceptStudyInfo(id) {
      this.rest.getAcceptStudyInfo(id).subscribe((data: { Data: { accepted_study_list:any } }) => {
      this.accept_Study_list = data.Data.accepted_study_list;
      });
    }


}
