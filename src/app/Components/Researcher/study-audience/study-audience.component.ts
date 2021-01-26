import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-study-audience',
  templateUrl: './study-audience.component.html',
  styleUrls: ['./study-audience.component.sass']
})
export class StudyAudienceComponent implements OnInit {
  categories: any;
  status: any;
  study_id:any;
  filtered_candidates_count:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.getCategory(this.study_id);
  }

  getCategory(study_id) {
    this.rest.getAudienceCategory(study_id).subscribe((data: { message:any, Data:{ question_categories:any,filtered_candidates_count:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.categories = data.Data.question_categories;
        this.filtered_candidates_count = data.Data.filtered_candidates_count;
      }
    });
  }


}
