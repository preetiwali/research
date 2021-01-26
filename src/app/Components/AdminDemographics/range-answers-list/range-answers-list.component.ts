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
  selector: 'app-range-answers-list',
  templateUrl: './range-answers-list.component.html',
  styleUrls: ['./range-answers-list.component.sass']
})
export class RangeAnswersListComponent implements OnInit {

  answerList:any;
  categoryName:any;
  question_id:any;
  closeResult: string;
  question:any;
  follow_up_questions:any;
  
  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

  editanswer = new FormGroup({
    follow_up_question: new FormControl(''),
    min_limit: new FormControl('', Validators.required),
    max_limit: new FormControl('', Validators.required)
  });


  addanswer = new FormGroup({
    min_limit: new FormControl('', Validators.required),
    max_limit: new FormControl('', Validators.required),
    follow_up_question: new FormControl(''),
    question_id: new FormControl('')
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
    this.question_id = this.route.snapshot.params['id']
    this.getAnswer(this.question_id);
  }


  getAnswer(id) {
    this.rest.getAllAnswersList(id).subscribe((data: { message:any , Data:{answer:any, question:any, follow_up_questions:any} }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.answerList = data.Data.answer;
        this.question = data.Data.question;
        this.follow_up_questions = data.Data.follow_up_questions;
      }
    });
  }


  editAnswer(id) {
    this.rest.editRangeAnswer(this.editanswer.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'answer-updated') {
        $(".close").click();
          this.getAnswer(this.question_id);
          this.toastr.success('Answer Updated', 'Success!');
          this.router.navigateByUrl('/rangeansewerlist/' +this.question_id);
      } else {
        this.toastr.error('Answer is not Updated', 'Oops!');
        this.router.navigateByUrl('/rangeansewerlist/' +this.question_id);
      }
    });
  }

  addAnswer() {
    this.rest.addAnswer(this.addanswer.value).subscribe((data: { message: any }) => {
      if (data.message === 'answer-saved') {
        this.addanswer.reset();
        $(".close").click();
        this.getAnswer(this.question_id);
        this.toastr.success('Answer Saved', 'Success!');
        this.router.navigateByUrl('/rangeansewerlist/'  +this.question_id);
      } else if (data.message === 'answer-already-exist') {
        this.toastr.warning('Answer already exists', 'Warning!');
        this.router.navigateByUrl('/rangeansewerlist/'  +this.question_id);
      } else {
        this.toastr.error('An error occured while adding Question', 'Oops!');
        this.router.navigateByUrl('/rangeansewerlist/'  +this.question_id);
      }
    }); 
  }

}
