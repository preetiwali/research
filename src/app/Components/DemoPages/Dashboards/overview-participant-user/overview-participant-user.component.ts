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
  selector: 'app-overview-participant-user',
  templateUrl: './overview-participant-user.component.html',
  styleUrls: ['./overview-participant-user.component.sass']
})
export class OverviewParticipantUserComponent implements OnInit {

  user:any;
  researcherusers: any;
  status: any;
  demographics:any;
  user_id: any;
  studies:any;
  id:any;
  seenntudies:any;
  accepted_studies:any;
  submitted_studies:any;
  attemptstudy:any;
  rejected_studies:any;
  image_url:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

ngOnInit() {
  this.getParticipantInfo(this.route.snapshot.params['id']); 
  this.user_id = this.route.snapshot.params['id'];
}

getParticipantInfo(id) {
  this.rest.getParticipantInfo(id).subscribe((data: { message:any, Data: { user:any, demographics:any,seen_studies:any
                                            ,rejected_studies:any,image_url:any,submitted_studies:any,accepted_studies:any, attempted_studies:any} }) => {
    if(data.message == 'unauthorised-user'){
      this.router.navigateByUrl('/');
    }else{
      this.user = data.Data.user;
      this.demographics = data.Data.demographics;
      this.seenntudies = data.Data.seen_studies;
      this.attemptstudy = data.Data.attempted_studies;
      this.accepted_studies = data.Data.accepted_studies;
      this.rejected_studies = data.Data.rejected_studies;
      this.submitted_studies = data.Data.submitted_studies;
      this.image_url = data.Data.image_url;
    } 
  });
}

updateUserActiveStatus(id)
  {
    this.rest.updateActiveStatus(id).subscribe((data: { message: any }) => {
      if (data.message == 'user-activated') {
      this.getParticipantInfo(this.route.snapshot.params['id']); 
      this.toastr.success('User Activated', 'Success!');
      this.router.navigateByUrl('/overviewuser/' +this.user_id);
    } else {
      this.toastr.error('Status not Updated', 'Oops!');
      this.router.navigateByUrl('/overviewuser/' +this.user_id);
      }
    });
  }

updateUserDeactiveStatus(id)
  {
    this.rest.updateDeactiveStatus(id).subscribe((data: { message: any }) => {
      if (data.message == 'user-deactivated') {
      this.getParticipantInfo(this.route.snapshot.params['id']); 
      this.toastr.success('User Deactivated', 'Success!');
      this.router.navigateByUrl('/overviewuser/' +this.user_id);
    } else {
      this.toastr.error('Status not Updated', 'Oops!');
      this.router.navigateByUrl('/overviewuser/' +this.user_id);
      }
      });
    }
}
