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
  selector: 'app-admin-active-study',
  templateUrl: './admin-active-study.component.html',
  styleUrls: ['./admin-active-study.component.sass']
})
export class AdminActiveStudyComponent implements OnInit {

  studies:any;
  closeResult: string;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

    deactivatestudy = new FormGroup({
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

    this.getAdminActiveStudyInfo(); 
  }
    
  getAdminActiveStudyInfo() {
    this.rest.getAdminActiveStudyInfo().subscribe((data: {message:any,  Data: { studies:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.studies = data.Data.studies;
      }
    });
  }

  DeactivateStudy(id){
    this.rest.DeactivateStudy(this.deactivatestudy.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'study-rejected') {
        $(".close").click();
        this.getAdminActiveStudyInfo(); 
        this.toastr.success('Study Deactivate', 'Success!');
        this.router.navigateByUrl('/adminactivestudy');
      } else {
        this.toastr.error('Study not deactivate', 'Oops!');
        this.router.navigateByUrl('/adminactivestudy');
      } 
    });
  }
}
