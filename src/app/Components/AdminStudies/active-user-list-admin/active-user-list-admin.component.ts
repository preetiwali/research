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


@Component({
  selector: 'app-active-user-list-admin',
  templateUrl: './active-user-list-admin.component.html',
  styleUrls: ['./active-user-list-admin.component.sass']
})
export class ActiveUserListAdminComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal) { }


  active_candidate_list:any;
  study_id:any;

  ngOnInit() {

    this.getCandidateInfo(this.route.snapshot.params['id']); 
    this.study_id = this.route.snapshot.params['id'];
  }

    
  getCandidateInfo(id) {
    this.rest.getCandidateInfo(id).subscribe((data: {message:any, Data: { active_candidate_list:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.active_candidate_list = data.Data.active_candidate_list;
      }
    
    });
  }
}
