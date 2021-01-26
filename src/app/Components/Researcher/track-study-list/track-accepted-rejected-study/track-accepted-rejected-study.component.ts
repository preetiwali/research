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
  selector: 'app-track-accepted-rejected-study',
  templateUrl: './track-accepted-rejected-study.component.html',
  styleUrls: ['./track-accepted-rejected-study.component.sass']
})
export class TrackAcceptedRejectedStudyComponent implements OnInit {

  message: any;
  accepted_users: any;
  rejected_users: any;
  user_id:any;
  study_id:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.study_id = this.route.snapshot.params['id']
    this.user_id = localStorage.getItem('user_id');
    this.getAcceptedRejectedTrackStudy(this.study_id);
  }

  getAcceptedRejectedTrackStudy(study_id) {
    this.rest.getAcceptedRejectedTrackStudy(study_id).subscribe((data: { Data:any }) => {
      this.accepted_users = data.Data.accepted_users;
      this.rejected_users = data.Data.rejected_users;

    });
  }

}
