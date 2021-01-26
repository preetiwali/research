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
  selector: 'app-in-active-study-admin',
  templateUrl: './in-active-study-admin.component.html',
  styleUrls: ['./in-active-study-admin.component.sass']
})
export class InActiveStudyAdminComponent implements OnInit {

  study:any;
  user:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {

    this.getAdminInactiveStudyDetail(this.route.snapshot.params['id']); 
  }
    
  getAdminInactiveStudyDetail(id) {
    this.rest.getAdminInactiveStudyDetail(id).subscribe((data: { message:any, Data: { study:any, user:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.study = data.Data.study;
        this.user = data.Data.user;
      }
    });
  }

}
