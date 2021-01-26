import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-slider-content',
  templateUrl: './slider-content.component.html',
  styleUrls: ['./slider-content.component.sass']
})
export class SliderContentComponent implements OnInit {

  pageList: any;
  category_id:any;
  closeResult: string;
  
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal) { }


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
    this.getPagesList();
  }

  editpage = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  addpagetype = new FormGroup({
    name: new FormControl('', Validators.required)
  });


  getPagesList() {
    this.rest.getPagesList().subscribe((data: { message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.pageList = data.Data;
      }
    });
  }

  editPage(id) {
    this.rest.editPage(id, this.editpage.value).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'page-updated') {
          $(".close").click();
          this.toastr.success('Page Type Updated', 'Success!');
          this.router.navigateByUrl('/content');
      } else {
        this.toastr.error('Page Type is not Updated', 'Oops!');
        this.router.navigateByUrl('/content');
      }
    });
  }
  

  addPageType() {
    this.rest.addPageType(this.addpagetype.value).subscribe((data: { message: any }) => {
      if (data.message === 'page-saved') {
        $(".close").click();
        this.addpagetype.reset();
        this.getPagesList();
        this.toastr.success('Page Type added successfully!', 'Success!');
        this.router.navigateByUrl('/content');
      } else {
        $(".close").click();
        this.toastr.error('An error occured while adding Page Type', 'Oops!');
        this.router.navigateByUrl('/content');
      }
    }); 
  }

  deletePageType(id){
    this.rest.deletePageType(id).subscribe((data: { message: any }) => {
      if (data.message == 'page-deleted') {
        $(".close").click();
        this.getPagesList();
        this.toastr.success('Page Type Deleted', 'Success!');
        this.router.navigateByUrl('/content');
      } else {
        $(".close").click();
        this.toastr.error('Page Type not Deleted', 'Oops!');
        this.router.navigateByUrl('/content');
      } 
    });
  }
}
