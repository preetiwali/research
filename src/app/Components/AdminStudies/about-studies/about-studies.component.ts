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
  selector: 'app-about-studies',
  templateUrl: './about-studies.component.html',
  styleUrls: ['./about-studies.component.sass']
})
export class AboutStudiesComponent implements OnInit {

  closeResult: string;
  studies:any;
  message:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private modalService: NgbModal ,private toastr: ToastrService) { }

  rejectstudy = new FormGroup({
    deactivate_reason: new FormControl('', Validators.required)
  });

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

  ngOnInit() {
    this.getAdminStudyInfo(); 
  }
    
  getAdminStudyInfo() {
    this.rest.getAdminStudyInfo().subscribe((data: {message:any, Data: { studies:any ,message:any  } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.studies = data.Data.studies;
        this.message = data.message;
      }
    });
  }

  acceptStudy(id){
    this.rest.acceptStudy(id).subscribe((data: { message: any }) => {
      if (data.message == 'study-activated') {
        this.getAdminStudyInfo(); 
        $(".close").click();
        this.toastr.success('Study Activate', 'Success!');
        this.router.navigateByUrl('/adminnewstudy');
      } else {
        $(".close").click();
        this.toastr.error('An error occured while study activate', 'Oops!');
        this.router.navigateByUrl('/adminnewstudy');
      } 
    });
  }

  rejectStudy(id){
    this.rest.rejectStudy(this.rejectstudy.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'study-rejected') {
        $(".close").click();
        this.getAdminStudyInfo(); 
        this.toastr.success('Study Rejected', 'Success!');
        this.router.navigateByUrl('/adminnewstudy');
      } else {
        this.toastr.error('An error occured while study rejected', 'Oops!');
        this.router.navigateByUrl('/adminnewstudy');
      } 
    });
  }
}
