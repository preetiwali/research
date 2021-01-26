import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-filled-question',
  templateUrl: './show-filled-question.component.html',
  styleUrls: ['./show-filled-question.component.sass']
})
export class ShowFilledQuestionComponent implements OnInit {
  category_id:any;
  questions:any;
  question_id:any;
  answers:any;
  questionList:any;
  que:any;
  demo123:any;
 

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.category_id = this.route.snapshot.params['id']
    this.getQuestion(this.category_id);
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }


  onDropDownClose() {
    console.log('dropdown closed');
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  getQuestion(id) {
    this.rest.getAllParticipantQuestions(id).subscribe((data) => {
      this.questionList = data;    
    });
  }
}
