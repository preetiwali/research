import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track-attempted-study',
  templateUrl: './track-attempted-study.component.html',
  styleUrls: ['./track-attempted-study.component.sass']
})
export class TrackAttemptedStudyComponent implements OnInit {

  message: any;
  users: any;
  user_id:any;
  study_id:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.user_id = localStorage.getItem('user_id');
    this.getAttemptedTrackStudy(this.study_id);
  }

  getAttemptedTrackStudy(study_id) {
    this.rest.getAttemptedTrackStudy(study_id).subscribe((data: { Data:any }) => {
      this.users = data.Data;
    });
  }
}
