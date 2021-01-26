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
  selector: 'app-study-participation',
  templateUrl: './study-participation.component.html',
  styleUrls: ['./study-participation.component.sass']
})
export class StudyParticipationComponent implements OnInit {

  user_id:any;
  study_id:any;
  more_than_four:any;
  between_two_four:any;
  less_than_two_count:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal) { }
  
  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.user_id = localStorage.getItem('user_id');
    // this.getParticipantRatingList();
  }
    
  // getParticipantRatingList() {
  //   this.rest.getParticipantRatingList().subscribe((data: { message:any, Data:any }) => {
  //     if(data.message == 'unauthorised-user'){
  //       this.router.navigateByUrl('/');
  //     }else{
  //       this.less_than_two_count = data.Data.less_than_two_count;
  //       this.between_two_four = data.Data.between_two_four_count;
  //       this.more_than_four = data.Data.more_than_four_count;
  //     }
  //   });
  // }

}
