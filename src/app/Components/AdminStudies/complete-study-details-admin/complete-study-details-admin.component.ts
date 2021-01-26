import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-complete-study-details-admin',
  templateUrl: './complete-study-details-admin.component.html',
  styleUrls: ['./complete-study-details-admin.component.sass']
})
export class CompleteStudyDetailsAdminComponent implements OnInit {

  study:any;
  user:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {

    this.getCompletedStudyDetail(this.route.snapshot.params['id']); 
  }
    
  getCompletedStudyDetail(id) {
    this.rest.getCompletedStudyDetail(id).subscribe((data: { message:any, Data: { study:any, user:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.study = data.Data.study;
        this.user = data.Data.user;
      }
    });
  }

}
