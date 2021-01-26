import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-study',
  templateUrl: './edit-study.component.html',
  styleUrls: ['./edit-study.component.sass'],
  providers: [DatePipe]
})
export class EditStudyComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService, public datePipe: DatePipe) { }

    study:any;
    id:any;
    min_to_date:any;
    max_participation_date:any;

  ngOnInit() {
    const new_date = new Date();
    this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd'); 
    this.getStudyInfo(this.route.snapshot.params['id']); 
  }
    
  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { message:any, Data: { study:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.study = data.Data.study;
        this.max_participation_date = this.datePipe.transform(this.study.max_participation_date,'yyyy-MM-dd');
      }
    });
  }

  editstudyform = new FormGroup({
    completionurl: new FormControl('', Validators.required),
    completioncode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    studyurl: new FormControl('', Validators.required),
    allowedtime: new FormControl('', Validators.required),
    estimatetime: new FormControl('', Validators.required),
    submission: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    max_participation_date: new FormControl('', Validators.required)
  });


  editStudy(id) {
    this.rest.editStudy(this.editstudyform.value, id).subscribe((data: { message: any, Data:any }) => {
      if (data.message == 'study-updated') {
          this.toastr.success('Study Updated', 'Success!');
          this.router.navigateByUrl('/researcherstudyDescription/' +data.Data.id);
      } else {
        this.toastr.error('Study is not Updated', 'Oops!');
        this.router.navigateByUrl('/editstudy/'+data.Data.id);
      }
    });
  }


}
