import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';


@Component({
  selector: 'app-study-description',
  templateUrl: './study-description.component.html',
  styleUrls: ['./study-description.component.sass']
})
export class StudyDescriptionComponent implements OnInit {

  heading = 'Study Description';
  subheading = 'Need to add formatting to your forms? Use these Vue2 widgets.';
  icon = 'pe-7s-like icon-gradient bg-love-kiss';

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'You need to write between 200-300 about your study so that the participant gets a good understanding of what your study is about.You need to write between. For example:This is a study regarding apples and how you feel about them. The study consists of few tasks and will take approximately 10 minutes to complete. You will be required to answers the questions asked. You will get paid X amount for your efforts. Please answer all questions honestly and with sincerity. You may wish to write your name as the university that you are associated with.',
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

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }
              
    id:any;
    word_count:any;
    text:any;
    words:any;

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
  }

  studydescriptionform = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  wordsCount(){
    this.text;
    this.words = 0;
    this.wordCounter();
  }

  wordCounter = function() {
    var wordCount = this.text ? this.text.split(/\s+/) : 0;
    this.words = wordCount ? wordCount.length : 0;
};
      

  studyDescription() {
    this.studydescriptionform.value.user_id = localStorage.getItem('user_id');
    this.studydescriptionform.value.id = this.id;
    this.rest.studyDescription(this.studydescriptionform.value).subscribe((data: { message: any, Data:any }) => {
      if (data.message === 'description-added') {
        this.toastr.success('Study Description successfully added', 'Success!');
        this.router.navigateByUrl('/studyaudience/'+data.Data.id);
      }else if(data.message === 'insufficient-length'){
        this.toastr.warning('Study Description should be of at least 100 words', 'Warning!');
        this.router.navigateByUrl('/studydescription/'+data.Data.id);
      } else {
        this.toastr.error('An error occured while added study description!', 'Oops!');
        this.router.navigateByUrl('/studydescription/' +data.Data.id);
      }
    }); 
  }

}
