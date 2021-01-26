import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { select$ } from '@angular-redux/store';
import * as $ from 'jquery';


@Component({
  selector: 'app-eligible-cndidates-list',
  templateUrl: './eligible-cndidates-list.component.html',
  styleUrls: ['./eligible-cndidates-list.component.sass']
})
export class EligibleCndidatesListComponent implements OnInit {

  unpublishedstudy: any;
  study: any;
  user_id:any;
  study_id:any;
  attempted_user:any;
  notattempted_user:any;
  select_all:boolean = false;
  idIndex:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) {
                this.masterSelected = false;

      }

    masterSelected:boolean;
    checkedList:any;

    public user_ids: any = [];

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.study_id = this.route.snapshot.params['id'];
    this.user_id = localStorage.getItem('user_id');
    this.getEligibleCandidate(this.study_id);
  }

  reportform = new FormGroup({
    id: new FormControl("")
  });

  getEligibleCandidate(study_id) {
    this.rest.getEligibleCandidate(study_id).subscribe((data: {message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.attempted_user = data.Data.attempted_user;
        this.notattempted_user = data.Data.not_attempted_user;
      }
    });
  }

  public checkUncheckAll() {

    if(this.select_all == false){

      this.select_all = true;
      var check = [];

      var show = $('#showcheckbox :checkbox').length;
      $('#showcheckbox :checkbox').each(function () {
        $(this).prop('checked',true)
        var sThisVal = $(this).val();
        check.push(sThisVal);
      });
      this.user_ids = check;
      console.log(this.user_ids);
      
    }else{

      this.select_all = false;
      var check = [];
      var show = $('#showcheckbox :checkbox').length;

      $('#showcheckbox :checkbox').each(function () {
        $(this).prop('checked',false)
        // var sThisVal = $(this).val();
        // check.push(sThisVal);
      });

      this.user_ids = check;
      console.log(this.user_ids);
    }
  }


  userSelect(id) {
    if(this.user_ids.includes(id.toString())){
      this.select_all = false;

    // this.masterSelected = this.notattempted_user.every(function(item:any) {
    //     return item.isSelected == true;

    //   })

      // $('#selectall').attr('checked', false); 
      $('#selectall :checkbox').each(function () {
        $(this).prop('checked',false)
      });
      
      // this.user_ids.push(id);
      this.idIndex = this.user_ids.indexOf(id.toString());
      this.user_ids.splice(this.idIndex, 1);
      console.log(this.user_ids);
      console.log(this.user_ids.indexOf(id.toString()));

    }else{
      this.select_all = false;
      this.user_ids.push(id.toString());
      console.log(this.user_ids);

    }
  }


  SendMailToParticipants(study_id) {
    this.reportform.value.user_ids = this.user_ids;
    this.reportform.value.select_all = this.select_all;

    this.rest.SendMailToParticipant(study_id, this.reportform.value).subscribe((data: { message: any }) => {
      if (data.message == 'please-select-user') {
        this.toastr.warning('Please select user', 'Warning!');
        this.router.navigateByUrl('/eligiblecandidates/' +this.study_id);
      } else if(data.message == 'mail-sent-to-all-users') {
        this.reportform.reset();
        this.toastr.success('Mail send to all users', 'Success!');
        this.router.navigateByUrl('/eligiblecandidates/'+this.study_id);
      }else if(data.message == 'mail-sent-to-selected-users'){
        this.reportform.reset();
        this.toastr.success('Mail send to selected users', 'Success!');
        this.router.navigateByUrl('/eligiblecandidates/'+this.study_id);
      }
    });
  }

}
