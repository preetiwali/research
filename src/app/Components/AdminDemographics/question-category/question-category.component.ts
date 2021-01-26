import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../api.service';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.sass']
})
export class QuestionCategoryComponent implements OnInit {

  heading = 'Category';
  categories: any;
  status: any;
  closeResult: string;
  category:any;
  selectedFile:any;
  image_url:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal) { }

  editcategory = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  ordercategory = new FormGroup({
    order_number: new FormControl('', Validators.required)
  });

  addcategory = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  uploadImage  =  new FormGroup({
    image_url: new FormControl('')
  });


  ngOnInit() {
    this.getCategory();
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

  getCategory() {
    this.rest.getAllCategory().subscribe((data: { message:any, Data: { question_categories:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.categories = data.Data.question_categories;
      }
      
    });
  }

  editCategory(id) {
    this.rest.updateCategory(this.editcategory.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'Question-category-updated') {
          $(".close").click();
          this.getCategory();
          this.toastr.success('Category Updated', 'Success!');
          this.router.navigateByUrl('/question-categoryadmin');
      } else {
        this.toastr.error('Category is not Updated', 'Oops!');
        this.router.navigateByUrl('/question-categoryadmin');
      }
    });
  }


  orderCategory(id) {
    this.rest.updateCategory(this.ordercategory.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'Question-category-updated') {
          $(".close").click();
          this.getCategory();
          this.toastr.success('Category order Updated', 'Success!');
          this.router.navigateByUrl('/question-categoryadmin');
      } else {
        this.toastr.error('Category order is not Updated', 'Oops!');
        this.router.navigateByUrl('/question-categoryadmin');
      }
    });
  }
  
  

  addCategory() {
    this.rest.addCategory(this.addcategory.value).subscribe((data: { message: any }) => {
      if (data.message === 'category-saved') {
        $(".close").click();
        this.addcategory.reset();
        this.getCategory();
        this.toastr.success('Category added successfully!', 'Success!');
        this.router.navigateByUrl('/question-categoryadmin');
      } else if (data.message === 'already-exist') {
        $(".close").click();
        this.toastr.success('Category already exists', 'Success!');
        this.router.navigateByUrl('/question-categoryadmin');
      } else {
        $(".close").click();
        this.toastr.error('An error occured while adding Category', 'Oops!');
        this.router.navigateByUrl('/question-categoryadmin');
      }
    }); 
  }

  deleteCategory(id){
    this.rest.deleteCategory(id).subscribe((data: { message: any }) => {
      if (data.message == 'question-category-deleted') {
        $(".close").click();
        this.getCategory();
        this.toastr.success('Category Deleted', 'Success!');
        this.router.navigateByUrl('/question-categoryadmin');
      } else {
        $(".close").click();
        this.toastr.error('Category not Deleted', 'Oops!');
        this.router.navigateByUrl('/question-categoryadmin');
      } 
    });
  }

  onFileChange($event) {
    this.selectedFile = $event.target.files[0]; // <--- File Object for future use.
    this.uploadImage.controls['image_url'].setValue(this.selectedFile ? this.selectedFile : ''); // <-- Set Value for Validation
  }


  updateImage(id) {
    const user_id = localStorage.getItem('user_id');
      const fd = new FormData();
    $('.user_id_proof_img').removeClass('display_none');
      // this.updateProfileImageForm.value
        if(this.selectedFile != null)
        {
          fd.append('file', this.selectedFile, this.selectedFile.name);
          this.rest.updateImage(fd,id).subscribe((data: { message: any }) => {
            if (data.message === 'question-category-image-updated') {
              $(".close").click();
              this.getCategory();
              this.toastr.success('Image updated', 'Success!');
              this.router.navigateByUrl('/question-categoryadmin');
            } else {
              this.toastr.error('An error occured while updating image', 'Oops!');
              this.router.navigateByUrl('/question-categoryadmin');
            }
          });
        }
        else
        {
          this.toastr.error('Please select an image', 'Oops!');
        }
  }

}
