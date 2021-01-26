import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';


@Component({
  selector: 'app-complete-study',
  templateUrl: './complete-study.component.html',
  styleUrls: ['./complete-study.component.sass']
})
export class CompleteStudyComponent implements OnInit {

  study: any;
  user_id:any;
  studies:any;
  closeResult:string;
  
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }

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
    
    this.user_id = localStorage.getItem('user_id');
    this.getCompletedStudy(this.user_id);
  }

  getCompletedStudy(user_id) {
    this.rest.getCompletedStudy(user_id).subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.studies = data.Data;
      }
    });
  }

  deleteCompleteStudy(id){
    this.rest.deleteStudy(id).subscribe((data: { message: any }) => {
      if (data.message == 'study-deleted') {
        $(".close").click();
          this.getCompletedStudy(this.user_id);
          this.toastr.success('Study Deleted', 'Success!');
          this.router.navigateByUrl('/studycomplete');
        } else {
          $(".close").click();
          this.toastr.error('Study not Deleted', 'Oops!');
          this.router.navigateByUrl('/studycomplete');
        } 
      });
  }
}
