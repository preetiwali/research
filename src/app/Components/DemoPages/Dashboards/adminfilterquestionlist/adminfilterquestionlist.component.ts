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
  selector: 'app-adminfilterquestionlist',
  templateUrl: './adminfilterquestionlist.component.html',
  styleUrls: ['./adminfilterquestionlist.component.sass']
})
export class AdminfilterquestionlistComponent implements OnInit {

  questionList:any;
  categoryName:any;
  category_id:any;
 
  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }


  ngOnInit() {
    this.category_id = this.route.snapshot.params['id']
    this.getQuestion(this.category_id);
  }

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

}
