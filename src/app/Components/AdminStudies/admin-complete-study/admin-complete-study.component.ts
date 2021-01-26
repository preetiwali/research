import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-admin-complete-study',
  templateUrl: './admin-complete-study.component.html',
  styleUrls: ['./admin-complete-study.component.sass']
})
export class AdminCompleteStudyComponent implements OnInit {

  studies:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

  ngOnInit() {

    this.getAdminCompleteStudyInfo(); 
  }
    
  getAdminCompleteStudyInfo() {
    this.rest.getAdminCompleteStudyInfo().subscribe((data: {message:any, Data: { studies:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.studies = data.Data.studies;
      }
    
    });
  }
}
