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
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.sass']
})
export class BlackListComponent implements OnInit {

  unpublishedstudy: any;
  study: any;
  closeResult: string;
  user_id:any;
  study_id:any;
  blacklistuser:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.user_id = localStorage.getItem('user_id');
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
        this.router.navigateByUrl('/blacklist/' +this.study_id);
      } else {
        this.toastr.error('User have not been whitelisted', 'Oops!');
        this.router.navigateByUrl('/blacklist/' +this.study_id);
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
        this.router.navigateByUrl('/blacklist/' +this.study_id);
      } else {
        $(".close").click();
        this.toastr.error('User not rejected', 'Oops!');
        this.router.navigateByUrl('/blacklist/' +this.study_id);
      } 
    });
  }

}
