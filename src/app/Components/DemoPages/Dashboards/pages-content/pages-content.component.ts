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
import {AngularEditorConfig} from '@kolkov/angular-editor';


@Component({
  selector: 'app-pages-content',
  templateUrl: './pages-content.component.html',
  styleUrls: ['./pages-content.component.sass']
})
export class PagesContentComponent implements OnInit {

  categories: any;
  pagesid:any;
  selectedFile:any;
  image_url:any;
  closeResult: string;
  htmlContent = '';
  page_id:any;
  
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

    config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ]
    };


  ngOnInit() {
    this.pagesid = this.route.snapshot.params['id']
    this.getContentDetails();
  }

  editcontentdetails = new FormGroup({
    content_type: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required) 
 });

 addcontent = new FormGroup({
    content_type: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  getContentDetails() {
    this.rest.getAllCategory().subscribe((data: { message:any, Data: { question_categories:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.categories = data.Data.question_categories;
      }
      
    });
  }

  editContentDetails(id) {
    this.rest.updateCategory(this.editcontentdetails.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'Question-category-updated') {
          $(".close").click();
          this.toastr.success('Content Details Updated', 'Success!');
          this.router.navigateByUrl('/contentdetails');
      } else {
        this.toastr.error('Content Details is not Updated', 'Oops!');
        this.router.navigateByUrl('/contentdetails');
      }
    });
  }
  

  addContentDetails(){
    this.rest.addBasicDetails(this.addcontent.value).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'page-saved') {
        $(".close").click();
        this.addcontent.reset();
        this.toastr.success('Content Saved', 'Success!');
        this.router.navigateByUrl('/contentdetails');
      } else {
        this.toastr.error('Content not saved', 'Oops!');
        this.router.navigateByUrl('/contentdetails');
      }
    });
  }

  deleteCotentDetails(id){
    this.rest.deleteCategory(id).subscribe((data: { message: any }) => {
      if (data.message == 'question-category-deleted') {
        $(".close").click();
        this.getContentDetails();
        this.toastr.success('Content Details Deleted', 'Success!');
        this.router.navigateByUrl('/contentdetails');
      } else {
        $(".close").click();
        this.toastr.error('Content Details not Deleted', 'Oops!');
        this.router.navigateByUrl('/contentdetails');
      } 
    });
  }
}
