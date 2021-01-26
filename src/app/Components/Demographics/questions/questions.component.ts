import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup,FormBuilder,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { ToastrService } from 'ngx-toastr';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Component({ 
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.sass'],
  providers: [DatePipe]
})
export class QuestionsComponent implements OnInit {
  category_id:any;
  questions:any;
  question_id:any;
  answers:any;
  questionList:any;
  que:any;
  demo123:any;
  dropdownSettings: IDropdownSettings = {};
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  cities: Array<any> = [];
  selectedItems: Array<any> = [];
  i:any;
  question:any;
  question_count:any;
  responsed_question:any;
  total:any;
  closeResult:string;
  totalvalue:any;
  min_to_date:any;


  constructor(private fb: FormBuilder, public datePipe: DatePipe, public rest: ApiService,private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.selectedItems = [
      {item_id: 4, item_text: 'San Francisco'},
      {item_id: 6, item_text: 'Berlin'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: this.showAll,
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.category_id = this.route.snapshot.params['id']
    this.getQuestion(this.category_id);

    const new_date = new Date();
    this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd');
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

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  toogleShowAll() {
    this.showAll = !this.showAll;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      enableCheckAll: this.showAll
    });
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter
    });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: 2
      });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: -1
      });
    }
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log('form model', this.saveanswer.get('city').value);
  }

  handleReset() {
    this.saveanswer.get('city').setValue([]);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  saveanswer = new FormGroup({
    answer_id: new FormControl(''),
    text_answer: new FormControl(''),
    description: new FormControl('')
  });

  rangesaveanswer = new FormGroup({
    description: new FormControl('')
  });

  getQuestion(id) {
    this.rest.getAllParticipantQuestions(id).subscribe((data) => {
      this.questionList = data.Data.questions;
      this.question_count = data.Data.question_count;
      this.responsed_question = data.Data.responsed_question;
      this.total =  (this.responsed_question / this.question_count)*100;
      this.totalvalue = this.total.toFixed(1);
    });
  }

  saveAnswer(question_id) {
    this.saveanswer.value.user_id = localStorage.getItem('user_id');
    this.saveanswer.value.question_id = question_id;
    this.rest.saveAnswer(this.saveanswer.value).subscribe((data: { message: any }) => {
      if (data.message === 'response-saved') {
        this.demo123 = "";
        this.getQuestion(this.category_id);
        this.toastr.success('Answer saved successfully', 'Success!');
        this.router.navigateByUrl('/questions/'+this.category_id);
      } else if(data.message === 'please-select-valid-answer'){
        this.demo123 = "";
        this.getQuestion(this.category_id);
        this.toastr.warning('Please select valid answer', 'Warning!');
        this.router.navigateByUrl('/questions/'+this.category_id);
      }else if(data.message === 'response-is-not-in-range'){
        this.demo123 = "";
        this.getQuestion(this.category_id);
        this.toastr.warning('Please select answer between range', 'Warning!');
        this.router.navigateByUrl('/questions/'+this.category_id);
      }
       else {
        this.toastr.error('An error occured while save answer', 'Oops!');
        this.router.navigateByUrl('/questions/' +this.category_id);
      }
    }); 
  }


  rangesaveAnswer(question_id) {
    this.rangesaveanswer.value.user_id = localStorage.getItem('user_id');
    this.rangesaveanswer.value.question_id = question_id;
    this.rest.saveAnswer(this.rangesaveanswer.value).subscribe((data: { message: any }) => {
      if (data.message === 'response-saved') {
        this.demo123 = "";
        this.getQuestion(this.category_id);
        this.toastr.success('Answer saved successfully!', 'Success!');
        this.router.navigateByUrl('/questions/'+this.category_id);
      } else if(data.message === 'please-select-valid-answer'){
        this.demo123 = "";
        this.getQuestion(this.category_id);
        this.toastr.warning('Please select valid answer', 'Warning!');
        this.router.navigateByUrl('/questions/'+this.category_id);
      }else if(data.message === 'response-is-not-in-range'){
        this.demo123 = "";
        this.getQuestion(this.category_id);
        this.toastr.warning('Please select answer between range', 'Warning!');
        this.router.navigateByUrl('/questions/'+this.category_id);
      }
       else {
        this.toastr.error('An error occured while save answer', 'Oops!');
        this.router.navigateByUrl('/questions/' +this.category_id);
      }
    }); 
  }


  deleteResponse(question_id){
    this.rest.deleteResponse(question_id).subscribe((data: { message: any }) => {
      if (data.message == 'response-deleted') {
        $(".close").click();
        this.getQuestion(this.category_id);
        this.toastr.success('Answer updated successfully!', 'Success!');
        this.router.navigateByUrl('/questions/' +this.category_id);
      } else {
        $(".close").click();
        this.toastr.error('An error occured while edit answer', 'Oops!');
        this.router.navigateByUrl('/questions/' +this.category_id);
      } 
    });
  }
}
