import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';


@Component({
  selector: 'app-active-study-report',
  templateUrl: './active-study-report.component.html',
  styleUrls: ['./active-study-report.component.sass']
})
export class ActiveStudyReportComponent implements OnInit {

  studies: any;
  study: any;
  user_id:any;
  url:any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }


  ngOnInit() {
    this.getAdminActiveStudyInfo(); 
  }
    
  getAdminActiveStudyInfo() {
    this.rest.getAdminActiveStudyInfo().subscribe((data: {message:any,  Data: { studies:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.studies = data.Data.studies;
      }
    });
  }

  // AllstudyExcelSheet(){
  //   this.rest.AllstudyExcelSheet().subscribe((data: {message:any,  Data: { } }) => {
  //     if(data.message == 'unauthorised-user'){
  //       this.router.navigateByUrl('/');
  //     }else{
  //       $(this).attr("target","_blank");
  //     }
  //   });
  // }


  goToLink(url: string){
    window.open(url, "_blank");
  }


  goToStudyLink(id){
    this.url = 'http://13.233.112.57:3000/live_study_tracker/' + id + '.xlsx';
    window.open(this.url, "_blank");
  }

}
