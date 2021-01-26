import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-track-active-study',
  templateUrl: './track-active-study.component.html',
  styleUrls: ['./track-active-study.component.sass']
})
export class TrackActiveStudyComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private toastr: ToastrService) { }

  studies:any;
  id:any;
  message:any;

  ngOnInit() {
    this.getTrackActiveStudy(); 
  }
    
  getTrackActiveStudy() {
    this.rest.getTrackActiveStudy().subscribe((data: { message:any, Data:any }) => {
      this.studies = data.Data;
      this.message = data.message;
    });
  }

}
