import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-complte-study-details',
  templateUrl: './complte-study-details.component.html',
  styleUrls: ['./complte-study-details.component.sass']
})
export class ComplteStudyDetailsComponent implements OnInit {

  htmlContent = '';

  gaugeValues: any = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50
  };

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

  study:any;
  required_participant:any;
  active_candidate:any;
  candidateInfo:any
  unpublishedstudy:any;
  user_id:any;
  filteredCandidateCount:any;
  is_paid:any;
  study_id:any
  submission:any;


  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService)
     { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.getStudyInfo(this.route.snapshot.params['id']); 
    this.getResearcherStudyInfo(this.route.snapshot.params['id']);
  }
    
  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { message:any, Data: {filtered_candidates_count:any, study:any, is_paid:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.submission = data.Data.study.submission;
        this.study = data.Data.study;
        this.filteredCandidateCount = data.Data.filtered_candidates_count;
        this.is_paid = data.Data.study.is_paid;
      }
    });
  }

  getResearcherStudyInfo(id) {
    this.rest.getResearcherStudyInfo(id).subscribe((data: {message:any, Data: { study:any, active_candidate:any} }) => {
        if(data.message == 'unauthorised-user'){
          this.router.navigateByUrl('/');
        }else{
          this.study = data.Data.study;
          this.active_candidate = data.Data.active_candidate;
          
        }
    });
  }
}
