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
  selector: 'app-accept-reject-study-list',
  templateUrl: './accept-reject-study-list.component.html',
  styleUrls: ['./accept-reject-study-list.component.sass']
})
export class AcceptRejectStudyListComponent implements OnInit {

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }


  accepted_candidate_list:any;
  closeResult: string;
  rejected_candidate_list:any;
  study_id:any;

  ngOnInit() {

   this.getAcceptCandidateInfo(this.route.snapshot.params['id']); 
   this.study_id = this.route.snapshot.params['id'];
  }
    
  getAcceptCandidateInfo(id) {
    this.rest.getAcceptCandidateInfo(id).subscribe((data: { message:any, Data: { accepted_candidate_list:any ,rejected_candidate_list:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.accepted_candidate_list = data.Data.accepted_candidate_list;
        this.rejected_candidate_list = data.Data.rejected_candidate_list;
      }
    
    });
  }

}
