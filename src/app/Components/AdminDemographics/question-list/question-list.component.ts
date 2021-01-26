import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../api.service';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.sass']
})
export class QuestionListComponent implements OnInit {

  category_id:any;
  questions:any;
  question_id:any;
  answers:any;
  questionList:any;
  que:any;
  categoryName:any;
  closeResult: string;
  message:any;
  selectedFile:any;
  image_url:any;
 
  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

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

    public getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

  ngOnInit() {
    this.category_id = this.route.snapshot.params['id']
    this.getQuestion(this.category_id);
  }

  addquestions = new FormGroup({
    question_type_id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    description2: new FormControl('', Validators.required)
  });

  editquestion = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    description2: new FormControl('', Validators.required)
  });

  uploadImage  =  new FormGroup({
    file: new FormControl('')
  });

  ordercategory = new FormGroup({
    order_number: new FormControl('', Validators.required)
  });

  
  getQuestion(id) {
    this.rest.getAllQuestionsList(id).subscribe((data: {message:any, Data:any}) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.questionList = data.Data.Questions;
        this.categoryName = data.Data.QuestionCategory.name;
      }
    
    });
  } 

  addQuestions() {
    this.addquestions.value.question_category_id = this.category_id;
    this.rest.addQuestions(this.addquestions.value).subscribe((data: { message: any }) => {
      if (data.message === 'question-saved') {
        $(".close").click();
        this.getQuestion(this.category_id);
        this.toastr.success('Question added successfully!', 'Success!');
        this.router.navigateByUrl('/questionlist/' +this.category_id);
      } else if (data.message === 'already-exists') {
        this.toastr.success('Question already exists', 'Success!');
        this.router.navigateByUrl('/questionlist/'+this.category_id);
      } else {
        this.toastr.error('An error occured while adding Question', 'Oops!');
        this.router.navigateByUrl('/questionlist/'+this.category_id);
      }
    }); 
  }
  

  editQuestion(id) {
    this.rest.updateQuestion(this.editquestion.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'question-updated') {
        $(".close").click();
        this.toastr.success('Question Updated', 'Success!');
        this.router.navigateByUrl('/questionlist/' +this.category_id);
      } else {
        $(".close").click();
        this.toastr.error('Question is not Updated', 'Oops!');
        this.router.navigateByUrl('/questionlist/' +this.category_id);
      }
    });
  }

  
  orderOfQuestions(id) {
    this.rest.updateQuestion(this.ordercategory.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'question-updated') {
          $(".close").click();
          this.toastr.success('Question order Updated', 'Success!');
          this.getQuestion(this.category_id);
          this.router.navigateByUrl('/questionlist/' +this.category_id);
        } else {
          this.toastr.error('Question order is not Updated', 'Oops!');
          this.getQuestion(this.category_id);
          this.router.navigateByUrl('/questionlist/' +this.category_id);
      }
    });
  }
  

  deleteQuestionInfo(id){
    this.rest.deleteQuestion(id).subscribe((data: { message: any }) => {
      if (data.message == 'question-deleted') {
        $(".close").click();
        this.getQuestion(this.category_id);
        this.toastr.success('Question Deleted', 'Success!');
        this.router.navigateByUrl('/questionlist/' +this.category_id);
      } else {
        $(".close").click();
        this.toastr.error('Question not Deleted', 'Oops!');
        this.router.navigateByUrl('/questionlist/' +this.category_id);
      } 
    });
  }


  onFileChange($event) {
    this.selectedFile = $event.target.files[0]; // <--- File Object for future use.
    this.uploadImage.controls['file'].setValue(this.selectedFile ? this.selectedFile : ''); // <-- Set Value for Validation
  }


  updateQuestionImage(id) {
    const user_id = localStorage.getItem('user_id');
      const fd = new FormData();
    $('.user_id_proof_img').removeClass('display_none');
      // this.updateProfileImageForm.value
        if(this.selectedFile != null)
        {
          fd.append('file', this.selectedFile, this.selectedFile.name);
          this.rest.updateQuestionImage(fd,id).subscribe((data: { message: any }) => {
            if (data.message === 'question-image-updated') {
              $(".close").click();
              this.getQuestion(this.category_id);
              this.toastr.success('Image updated', 'Success!');
              this.router.navigateByUrl('/questionlist/' +this.category_id);
            } else {
              $(".close").click();
              this.getQuestion(this.category_id);
              this.toastr.error('An error occured while upload image', 'Oops!');
              this.router.navigateByUrl('/questionlist/' +this.category_id);
            }
          });
        }
        else
        {
          this.toastr.error('Please select an image', 'Oops!');
        }
  }
}
