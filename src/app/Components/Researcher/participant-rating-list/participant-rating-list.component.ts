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
  selector: 'app-participant-rating-list',
  templateUrl: './participant-rating-list.component.html',
  styleUrls: ['./participant-rating-list.component.sass']
})
export class ParticipantRatingListComponent implements OnInit {

  user_id:any;
  study_id:any;
  research_worker_id:any;
  below_50_percent:any;
  above_50_percent:any;
  above_60_percent:any;
  above_75_percent:any;
  above_90_percent:any;
  more_than_four:any;
  between_two_four:any;
  less_than_two_count:any;
  zero_studies:any;
  total90:any;

  acceptance_list:any;
  experience_list:any;
  acceptancelistshow:boolean = true;
  experiencelistshow:boolean = false;
  listblack:boolean = false;
  listwhite:boolean = false;
  study: any;
  closeResult: string;
  whitelistuser:any;
  blacklistuser:any;
  participation_selection:any;
  rating_selection:any;

  checktrue :any = "rating_selection";
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.study_id = this.route.snapshot.params['id'];
    this.getParticipantExprienceList();
    this.getParticipantRatingList(this.study_id);
    this.getParticipantstudyList();
    this.getwhiteList(this.route.snapshot.params['id']);
    this.getblackList(this.route.snapshot.params['id']);
  }

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

  whitelist = new FormGroup({
    research_worker_id: new FormControl('', Validators.required)
  });

  participantSubmission = new FormGroup({
    rating_selection: new FormControl()
  });

  participantExprience = new FormGroup({
    participation_selection: new FormControl()
  });
    

  getParticipantExprienceList() {
    this.rest.getParticipantExprienceList().subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.experience_list = data.Data.experience_list;
        this.acceptance_list = data.Data.acceptance_list;
        this.research_worker_id = data.Data.acceptance_list.research_worker_id;
      }
    });
  }


  getParticipantRatingList(study_id) {
    this.rest.getParticipantRatingList(study_id).subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.above_90_percent = data.Data.above_90_percent;
        this.above_75_percent = data.Data.above_75_percent;
        this.above_60_percent = data.Data.above_60_percent;
        this.above_50_percent = data.Data.above_50_percent;
        this.below_50_percent = data.Data.below_50_percent;
        this.rating_selection = data.Data.rating_selection;
        this.participation_selection = data.Data.participation_selection;
      }
    });
  }
  

  getParticipantstudyList() {
    this.rest.getParticipantRatingList(this.study_id).subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.less_than_two_count = data.Data.less_than_two_count;
        this.between_two_four = data.Data.between_two_four_count;
        this.more_than_four = data.Data.more_than_four_count;
        this.zero_studies = data.Data.zero_studies;
      }
    });
  }

  saveParticipantrating(){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.participantrating(this.study_id,this.participantSubmission.value).subscribe((data: { message: any }) => {
      if (data.message == 'rating-selected') {
        this.getParticipantRatingList(this.study_id);
        this.toastr.success('Participant submission accepted', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        this.toastr.error('Participant submission not accepted', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }


  deleteRatinglist(){
    this.study_id = this.route.snapshot.params['id'];
    this.participantSubmission.value.rating_selection = 'no_rating_filter';
    this.rest.participantrating(this.study_id,this.participantSubmission.value).subscribe((data: { message: any }) => {
      if (data.message == 'rating-selected') {
        this.getParticipantRatingList(this.study_id);
        this.toastr.success('Participant submission deleted', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        this.getParticipantRatingList(this.study_id);
        this.toastr.error('Participant submission not deleted', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }

  
  studyparticipatedExprience(){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.studyparticipated(this.study_id,this.participantExprience.value).subscribe((data: { message: any }) => {
      if (data.message == 'rating-selected') {
        this.getParticipantRatingList(this.study_id);
        this.toastr.success('Participant accepted', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        this.getParticipantRatingList(this.study_id);
        this.toastr.error('Participant not accepted', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }


  deleteExpriencelist(){
    this.study_id = this.route.snapshot.params['id'];
    this.participantExprience.value.participation_selection = 'no_participation_filter';
    this.rest.studyparticipated(this.study_id,this.participantExprience.value).subscribe((data: { message: any }) => {
      if (data.message == 'rating-selected') {
        this.getParticipantRatingList(this.study_id);
        this.toastr.success('Accepted participant deleted', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        this.getParticipantRatingList(this.study_id);
        this.toastr.error('Accepted participant not deleted', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }
    
    
  getwhiteList(study_id) {
    this.rest.getwhiteList(study_id).subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.whitelistuser = data.Data.whitelist_user_list;
        this.study = data.Data.study;
      }
    });
  }

 
  whiteList()
  {
    this.whitelist.value.study_id  = this.study_id;
    this.rest.whiteList(this.whitelist.value).subscribe((data: { message: any ,errors:any }) => {
      if (data.message == 'user-white-listed') {
      $(".close").click();
      this.getwhiteList(this.route.snapshot.params['id']);
      this.whitelist.reset();
      this.toastr.success('Users whitelisted', 'Success!');
    }else if(data.message == 'user-already-whitelisted'){
      $(".close").click();
      this.getwhiteList(this.route.snapshot.params['id']);
      this.toastr.warning('User already white listed', 'Warning!');
    }else {
      $(".close").click();
      var errors = data.errors        
      for (let index = 0; index < errors.length; index++) {
        this.toastr.warning(errors[index], 'Warning!');
        }
      }
    });
  }


  acceptWhiteListUser(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.acceptWhiteListUser(user_id,this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'blacklist-whitelisted-user') {
        this.getwhiteList(this.route.snapshot.params['id']);
        this.toastr.success('User Blacklisted', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        this.toastr.error('User not Blacklisted', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }

  rejectWhiteListUser(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.rejectWhiteListUser(user_id,this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'whitelisted-user-deleted') {
        $(".close").click();
        this.getwhiteList(this.route.snapshot.params['id']);
        this.toastr.success('Whitelisted user rejected', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        $(".close").click();
        this.toastr.error('Whitelisted user not rejected', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }

  whitelistedUserSelect(){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.whitelistedUserSelect(this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'only-whitelisted-users-selected') {
        $(".close").click();
        this.getwhiteList(this.route.snapshot.params['id']);
        this.toastr.success('Study will be send to only whitelisted user', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      }else {
        $(".close").click();
        this.toastr.error('Something wrong happend', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }

  whitelistedUserNotSelect(){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.whitelistedUserNotSelect(this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'only-whitelisted-users-rejected') {
        $(".close").click();
        this.getwhiteList(this.route.snapshot.params['id']);
        this.toastr.success('Study will be send to all eligible users', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      }else {
        $(".close").click();
        this.toastr.error('Something wrong happend', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }

  blacklist = new FormGroup({
    research_worker_id: new FormControl('', Validators.required)
  });

  getblackList(study_id) {
    this.rest.getblackList(study_id).subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.blacklistuser = data.Data.blacklist_user_list;
        this.study = data.Data.study;
      }
    });
  }


  blackList()
  {
    this.blacklist.value.study_id  = this.study_id;
    this.rest.blackList(this.blacklist.value).subscribe((data: { message: any, errors:any }) => {
      if (data.message == 'user-black-listed') {
      $(".close").click();
      this.getblackList(this.route.snapshot.params['id']);
      this.blacklist.reset(); 
      this.toastr.success('Users blacklisted', 'Success!');
    }else if(data.message == 'user-already-blacklisted'){
      $(".close").click();
      this.getblackList(this.route.snapshot.params['id']);
      this.toastr.warning('User already black listed', 'Success!');
    }else if(data.message == 'user-already-blacklisted'){
      $(".close").click();
      this.getblackList(this.route.snapshot.params['id']);
      this.toastr.warning('User already black listed', 'Warning!');
    } else {
      $(".close").click();
      var errors = data.errors    
      console.log(errors);
          
      for (let index = 0; index < errors.length; index++) {
        this.toastr.warning(errors[index], 'Warning!');
        }
      }
    });
  }

  acceptBlackListUser(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.acceptBlackListUser(user_id,this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'whitelist-blacklisted-user') {
        this.getblackList(this.route.snapshot.params['id']);
        this.toastr.success('User whitelisted', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        this.toastr.error('User have not been whitelisted', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }

  rejectBlackListUser(user_id){
    this.study_id = this.route.snapshot.params['id'];
    this.rest.rejectBlackListUser(user_id,this.study_id).subscribe((data: { message: any }) => {
      if (data.message == 'blacklisted-user-deleted') {
        $(".close").click();
        this.getblackList(this.route.snapshot.params['id']); 
        this.toastr.success('User rejected', 'Success!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } else {
        $(".close").click();
        this.toastr.error('User not rejected', 'Oops!');
        this.router.navigateByUrl('/participantratinglist/' +this.study_id);
      } 
    });
  }


  showacceptance(){
    this.acceptancelistshow = true;
    this.experiencelistshow = false;
    this.listblack = false;
    this.listwhite = false;
  }

  showEprerience(){
    this.acceptancelistshow = false;
    this.experiencelistshow = true;
    this.listblack = false;
    this.listwhite = false;
  }

  showWhitelist(){
    this.acceptancelistshow = false;
    this.experiencelistshow = false;
    this.listblack = false;
    this.listwhite = true;
  }

  showBlacklist(){
    this.acceptancelistshow = false;
    this.experiencelistshow = false;
    this.listblack = true;
    this.listwhite = false;
  }

}
