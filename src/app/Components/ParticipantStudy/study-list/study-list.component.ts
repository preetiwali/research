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
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.sass']
})
export class StudyListComponent implements OnInit {

  participantstudy: any;
  study: any;
  user_id:any;
  seenstudy:any;
  message:any;
  max_participation_date:any;
  today = new Date();
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.getParticipantStudyInfo(this.user_id);
  }


  getParticipantStudyInfo(user_id) {
    this.rest.getParticipantStudyInfo(user_id).subscribe((data: { message:any, Data: { studies:any } }) => {
      this.participantstudy = data.Data.studies;
      this.message = data.message;
    });
  }
  

  seenStudy(study_id) {
    this.rest.seenStudy(study_id).subscribe((data: { Data:any }) => {
      this.seenstudy = data.Data;
    });
  }
}
