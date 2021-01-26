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
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.sass']
})
export class WhiteListComponent implements OnInit {

  unpublishedstudy: any;
  study: any;
  closeResult: string;
  user_id:any;
  study_id:any;
  whitelistuser:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.user_id = localStorage.getItem('user_id');
    this.getwhiteList(this.route.snapshot.params['id']);
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
        this.router.navigateByUrl('/whitelist/' +this.study_id);
      } else {
        this.toastr.error('User not Blacklisted', 'Oops!');
        this.router.navigateByUrl('/whitelist/' +this.study_id);
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
        this.router.navigateByUrl('/whitelist/' +this.study_id);
      } else {
        $(".close").click();
        this.toastr.error('Whitelisted user not rejected', 'Oops!');
        this.router.navigateByUrl('/whitelist/' +this.study_id);
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
        this.router.navigateByUrl('/whitelist/' +this.study_id);
      }else {
        $(".close").click();
        this.toastr.error('Something wrong happend', 'Oops!');
        this.router.navigateByUrl('/whitelist/' +this.study_id);
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
        this.router.navigateByUrl('/whitelist/' +this.study_id);
      }else {
        $(".close").click();
        this.toastr.error('Something wrong happend', 'Oops!');
        this.router.navigateByUrl('/whitelist/' +this.study_id);
      } 
    });
  }

}
