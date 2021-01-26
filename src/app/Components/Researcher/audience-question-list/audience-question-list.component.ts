import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { ToastrService } from 'ngx-toastr';
import {NouiFormatter} from 'ng2-nouislider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


export class TimeFormatter implements NouiFormatter {

  heading = 'Range Slider';
  subheading = 'Create sliders and range sliders with these Vue form widgets.';
  icon = 'pe-7s-lintern icon-gradient bg-strong-bliss';

  to(value: number): string {
    const h = Math.floor(value / 3600);
    const m = Math.floor(value % 3600 / 60);
    const s = value - 60 * m - 3600 * h;
    const values = [h, m, s];
    let timeString = '';
    values.forEach((_, i) => {
      if (values[i] < 10) {
        timeString += '0';
      }
      timeString += values[i].toFixed(0);
      if (i < 2) {
        timeString += ':';
      }
    });
    return timeString;
  }

  from(value: string): number {
    const v = value.split(':').map(parseInt);
    let time = 0;
    time += v[0] * 3600;
    time += v[1] * 60;
    time += v[2];
    return time;
  }
}

@Component({
  selector: 'app-audience-question-list',
  templateUrl: './audience-question-list.component.html',
  styleUrls: ['./audience-question-list.component.sass']
})
export class AudienceQuestionListComponent implements OnInit {

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
  dropdownSettings: IDropdownSettings = {};
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  cities: Array<any> = [];
  selectedItems: Array<any> = [];
  i:any;
  closeResult:string;
  greaterAge:boolean = false;
  minimumAge:boolean = false;


  constructor(public rest: ApiService, private route: ActivatedRoute,private formBuilder: FormBuilder,
    private modalService: NgbModal,private router: Router, private toastr: ToastrService) { }

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

    this.min_limit_val;
    this.max_limit_val;
    this.category_id = this.route.snapshot.params['id']
    this.study_id = this.route.snapshot.params['study_id']
    this.getQuestion(this.category_id,this.study_id);

    this.form1 = this.formBuilder.group({single: [10]});
    this.form2 = this.formBuilder.group({range: [[2, 8]]});
    this.form3 = this.formBuilder.group({single: [3]});

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


  rangeSlider()
  {
    $('#multi9').mdbRange({
      value: {
        min: 1000,
        max: 1500
      },
      single: {
        active: true,
        multi: {
          active: true,
          rangeLength: 1
        },
      }
    });
  }


  // range slider

  public disabled = false;
  public keyupLabelOn = false;
  public keydownLabelOn = false;

  public someValue = 5;
  public someMin = -10;
  public someMax = 10;
  public someStep = 1;
  public someRange: number[] = [3, 7];
  public someRange2: number[] = [10, 15];
  public someRange3: number[] = [20, 50];
  public simeTime = 0;
  public someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    limit: 5,
    range: {
      min: 0,
      max: 20
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };

  public someKeyboard: number[] = [1, 3];
  public someKeyboardConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: [0, 5],
    keyboard: true,
    step: 0.1,
    pageSteps: 10,  // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 5
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    }
  };

  public someKeyboard2EventHandler = (e: KeyboardEvent) => {
    console.log('overridden keyboard handler');

    const index = parseInt((e.target as HTMLElement).getAttribute('data-handle'));

    let multiplier = 0;
    const stepSize = 0.1;

    switch (e.which) {
      case 40:
      case 37:
        multiplier = -2;
        e.preventDefault();
        break;

      case 38:
      case 39:
        multiplier = 3;
        e.preventDefault();
        break;

      default:
        break;
    }

    const delta = multiplier * stepSize;
    const newValue = [].concat(this.someKeyboard2);
    newValue[index] += delta;
    this.someKeyboard2 = newValue;
  };

  public someKeyboard2: number[] = [1, 3];
  public someKeyboardConfig2: any = {
    behaviour: 'drag',
    connect: true,
    start: [0, 5],
    step: 0.1,
    range: {
      min: 0,
      max: 5
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    },
    keyboard: true,
    onKeydown: this.someKeyboard2EventHandler,
  };

  public form1: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;

  public someTimeConfig: any = {
    start: 86400 / 2,
    range: {
      min: 0,
      max: 86399
    },
    tooltips: new TimeFormatter(),
    step: 1
  };


  changeSomeValue(value: number) {
    this.someValue = this.someValue + value;
  }

  changeSomeMin(value: number) {
    this.someMin = this.someMin + value;
  }

  changeSomeMax(value: number) {
    this.someMax = this.someMax + value;
  }

  changeSomeStep(value: number) {
    this.someStep = this.someStep + value;
  }

  changeSingleFormValue(value: number) {
    const control = this.form1.controls.single as FormControl;
    control.setValue(control.value + value);
  }

  changeRangeFormValue(index: number, value: number) {
    const control = this.form2.controls.range as FormControl;
    const newRange = control.value;
    newRange[index] = newRange[index] + value;
    control.setValue(newRange);
  }

  changeSomeRange(index: number, value: number) {
    const newRange = [this.someRange[0], this.someRange[1]];
    newRange[index] = newRange[index] + value;
    this.someRange = newRange;
  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }

  blinkKeyupLabel() {
    this.keyupLabelOn = true;
    setTimeout(() => {
      this.keyupLabelOn = false;
    }, 450);
  }

  blinkKeydownLabel() {
    this.keydownLabelOn = true;
    setTimeout(() => {
      this.keydownLabelOn = false;
    }, 450);
  }

  toggleDisabled() {
    const control = this.form3.controls.single;
    control.enabled ? control.disable() : control.enable();
  }

  // end of range slider

  saveanswer = new FormGroup({
    answer_id: new FormControl('')
  });


  saverangeanswer = new FormGroup({
     min_limit: new FormControl(''),
     max_limit: new FormControl('')
  });

  getQuestion(id,study_id) {
    this.rest.getAllQuestions(id,study_id).subscribe((data: { message:any, Data: {audience_question:any,image_url:any, category_name:any , desired_audience:any }}) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.questionList = data.Data.audience_question;
        this.category_name = data.Data.category_name;
        this.image_url = data.Data.image_url;
        this.desired_audience = data.Data.desired_audience;
      }
    });
  }

  saveAnswer(question_id, study_id) {
    this.saveanswer.value.user_id = localStorage.getItem('user_id');
    this.saveanswer.value.question_id = question_id;
    this.saveanswer.value.study_id = study_id;
    this.rest.saveAudienceAnswer(this.saveanswer.value).subscribe((data: { message: any }) => {
      if (data.message === 'audience-response-saved') {
        this.demo123 = "";
        this.getQuestion(this.category_id,this.study_id);
        this.router.navigateByUrl('/studyaudiencequestionlist/'+this.category_id + '/' +this.study_id);
        this.saveanswer.reset();
      }else if(data.message === 'please-select-valid-answer'){
        this.demo123 = "";
        this.getQuestion(this.category_id,this.study_id);
        this.toastr.warning('Please select valid answer', 'Warning!');
        this.router.navigateByUrl('/studyaudiencequestionlist/'+this.category_id + '/' +this.study_id);
      }
       else {
        this.router.navigateByUrl('/studyaudiencequestionlist/' +this.category_id + '/' +this.study_id);
      }
    });
  }


  saveRangeAnswer(question_id, study_id) {
    this.saverangeanswer.value.user_id = localStorage.getItem('user_id');
    this.saverangeanswer.value.question_id = question_id;
    this.saverangeanswer.value.study_id = study_id;
    this.rest.saveAudienceAnswer(this.saverangeanswer.value).subscribe((data: { message: any }) => {
      if (data.message === 'audience-response-saved') {
        this.demo123 = "";
        this.getQuestion(this.category_id,this.study_id);
        this.toastr.success('Answer saved', 'Success!');
        this.router.navigateByUrl('/studyaudiencequestionlist/'+this.category_id + '/' +this.study_id);
        this.saverangeanswer.reset();
      }else if(data.message === 'please-select-valid-answer'){
        this.demo123 = "";
        this.getQuestion(this.category_id,this.study_id);
        this.toastr.warning('Please select valid answer', 'Warning!');
        this.router.navigateByUrl('/studyaudiencequestionlist/'+this.category_id + '/' +this.study_id);
      }
       else {
        this.toastr.error('An error occured to save answer!', 'Oops!');
        this.router.navigateByUrl('/studyaudiencequestionlist/' +this.category_id + '/' +this.study_id);
      }
    });
  }

  deleteResearcherResponse(question_id){
    this.rest.deleteResearcherResponse(this.study_id,question_id).subscribe((data: { message: any }) => {
      if (data.message == 'audience-deleted') {
        $(".close").click();
        this.getQuestion(this.category_id,this.study_id);
        this.toastr.success('Answer deleted', 'Success!');
        this.router.navigateByUrl('/studyaudiencequestionlist/' +this.category_id + '/' +this.study_id);
      } else {
        $(".close").click();
        this.toastr.error('An error occured to delete answer!', 'Oops!');
        this.router.navigateByUrl('/studyaudiencequestionlist/' +this.category_id + '/' +this.study_id);
      }
    });
  }

  getMinValue(event){
    this.min_limit_val = (document.getElementById("range-1a") as HTMLInputElement).value;
  }

  getMaxValue(event){
    this.max_limit_val = (document.getElementById("range-1b") as HTMLInputElement).value;
  }


  greaterAgeFunction(){
    if(this.saverangeanswer.value.min_limit <=  this.saverangeanswer.value.max_limit){
      this.greaterAge = true;
      document.getElementById("maximumage").classList.remove("ng-invalid");
      document.getElementById("maximumage").classList.remove("is-invalid");

      document.getElementById("maximumage").classList.add("ng-valid");
      document.getElementById("maximumage").classList.add("is-valid");
    } else {
      this.greaterAge = false;
      document.getElementById("maximumage").classList.remove("ng-valid");
      document.getElementById("maximumage").classList.remove("is-valid");

      document.getElementById("maximumage").classList.add("ng-invalid");
      document.getElementById("maximumage").classList.add("is-invalid");
    }
}

  minimumAgeFunction(){
    if(this.saverangeanswer.value.min_limit < 15){
      this.minimumAge = false;
      document.getElementById("minimumage").classList.remove("ng-valid");
      document.getElementById("minimumage").classList.remove("is-valid");

      document.getElementById("minimumage").classList.add("ng-invalid");
      document.getElementById("minimumage").classList.add("is-invalid");
    } else {

      this.minimumAge = true;
      document.getElementById("minimumage").classList.remove("ng-invalid");
      document.getElementById("minimumage").classList.remove("is-invalid");

      document.getElementById("minimumage").classList.add("ng-valid");
      document.getElementById("minimumage").classList.add("is-valid");
    }
  }

}
