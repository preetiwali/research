import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminfilteranswerlist',
  templateUrl: './adminfilteranswerlist.component.html',
  styleUrls: ['./adminfilteranswerlist.component.sass']
})
export class AdminfilteranswerlistComponent implements OnInit {

  category_id:any;
  questions:any;
  question_id:any;
  answers:any;
  questionList:any;
  que:any;
  demo123:any;
  study_id:any;
  desired_audience:any;
  max_limit:any;
  min_limit:any;
  min_limit_val:any;
  max_limit_val:any;
  image_url:any;
  category_name:any;
  answerList:any;
  categoryName:any;
  question:any;
  follow_up_questions:any;
  question_type_id:any;
  users:any;
  

  constructor(public rest: ApiService, private route: ActivatedRoute,private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.min_limit_val;
    this.max_limit_val;
    this.category_id = this.route.snapshot.params['id']
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
        this.question_type_id = data.Data.question.question_type_id
        this.follow_up_questions = data.Data.follow_up_questions;
      }
    });
  }

  saverangeanswer = new FormGroup({
     min_limit: new FormControl(''),
     max_limit: new FormControl('')
  });  

  saveRangeAnswer(question_id) {
    this.saverangeanswer.value.question_id = question_id;
    this.rest.adminFilter(this.saverangeanswer.value).subscribe((data: { message: any, Data }) => {
      this.users = data.Data.users;
    }); 
  }

  adminFilter(question_id,answer_id){
    this.saverangeanswer.value.question_id = question_id;
    this.saverangeanswer.value.answer_id = answer_id;
    this.rest.adminFilter(this.saverangeanswer.value).subscribe((data: { message: any, Data }) => {
      this.users = data.Data.users;
    }); 
  }

}
