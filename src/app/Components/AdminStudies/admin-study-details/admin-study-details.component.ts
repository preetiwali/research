import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-study-details',
  templateUrl: './admin-study-details.component.html',
  styleUrls: ['./admin-study-details.component.sass']
})
export class AdminStudyDetailsComponent implements OnInit {

  study:any;
  user:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {

    this.getAdminStudyDetail(this.route.snapshot.params['id']); 
  }
    
  getAdminStudyDetail(id) {
    this.rest.getAdminStudyDetail(id).subscribe((data: {message:any, Data: { study:any, user:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.study = data.Data.study;
        this.user = data.Data.user;
      }
    
    });
  }
}
