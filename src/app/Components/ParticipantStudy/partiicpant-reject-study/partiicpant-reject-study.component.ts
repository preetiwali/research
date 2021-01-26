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
  selector: 'app-partiicpant-reject-study',
  templateUrl: './partiicpant-reject-study.component.html',
  styleUrls: ['./partiicpant-reject-study.component.sass']
})
export class PartiicpantRejectStudyComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }


    total_reject_Study_list:any;
    user_id:any;
  

    ngOnInit() {
  
     this.getRejectStudyInfo(this.route.snapshot.params['id']); 
     this.user_id = this.route.snapshot.params['id'];
    
    }
      
    getRejectStudyInfo(id) {
      this.rest.getRejectStudyInfo(id).subscribe((data: { Data: { rejected_study_list:any } }) => {
      this.total_reject_Study_list = data.Data.rejected_study_list;
      });
    }
}
