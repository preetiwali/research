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
  selector: 'app-less-than-two-filter',
  templateUrl: './less-than-two-filter.component.html',
  styleUrls: ['./less-than-two-filter.component.sass']
})
export class LessThanTwoFilterComponent implements OnInit {

  user_id:any;
  study_id:any;
  participantfilterlist:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.user_id = localStorage.getItem('user_id');
    // this.getParticipantStudyLessThanTwoList();
  }

    
  // getParticipantStudyLessThanTwoList() {
  //   this.rest.getParticipantRatingList().subscribe((data: { message:any, Data:any }) => {
  //     if(data.message == 'unauthorised-user'){
  //       this.router.navigateByUrl('/');
  //     }else{
  //       this.participantfilterlist = data.Data.less_than_two;
  //     }
  //   });
  // }

  whiteListNewUser(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.whiteListNewUser(user_id,this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'user-white-listed') {
        // this.getParticipantStudyLessThanTwoList();
        this.toastr.success('User whitelisted', 'Success!');
        this.router.navigateByUrl('/studylessthantwofilter/' +this.study_id);
      } else if(data.message == 'already-white-listed'){
        this.toastr.warning('User already whitelisted', 'Oops!');
        this.router.navigateByUrl('/studylessthantwofilter/' +this.study_id);
      }else {
        this.toastr.error('User have not been whitelisted', 'Oops!');
        this.router.navigateByUrl('/studylessthantwofilter/' +this.study_id);
      } 
    });
  }

}
