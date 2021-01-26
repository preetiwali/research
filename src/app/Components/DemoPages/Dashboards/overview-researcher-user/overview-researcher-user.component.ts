import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormArray, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {ChartComponent} from 'ng-apexcharts';

@Component({
  selector: 'app-overview-researcher-user',
  templateUrl: './overview-researcher-user.component.html',
  styleUrls: ['./overview-researcher-user.component.sass']
})
export class OverviewResearcherUserComponent implements OnInit {

  userresearcher: any;
  studies:any;
  user:any;
  form: FormGroup;
  user_id:any;
  total_paid_amount:any;
  monthly_payment:any;
  months:any;
  image_url:any;

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']); 
    this.user_id = this.route.snapshot.params['id'];
  }


  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { this.form = new FormGroup({
      title: new FormControl('Basic Chart'),
      type: new FormControl('line'),
      height: new FormControl(350),
      series: new FormArray([
        new FormGroup({
          name: new FormControl('Series'),
          type: new FormControl('line'),
          data: new FormArray([
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100)),
            new FormControl(this.getRandomArbitrary(0, 100))
          ])
        })
      ]),
      xaxis: new FormArray([
        new FormControl('Jan'),
        new FormControl('Feb'),
        new FormControl('Mar'),
        new FormControl('Apr')
      ])
    });
  }


  @ViewChild('chart') chart: ChartComponent;

  addValue() {
    (this.form.get('series') as FormArray).controls.forEach((c) => {
      (c.get('data') as FormArray).push(new FormControl(this.getRandomArbitrary(0, 100)));
    });
    (this.form.get('xaxis') as FormArray).push(new FormControl('Jan'));
  }

  addSeries() {
    (this.form.get('series') as FormArray).push(new FormGroup({
      name: new FormControl('Series'),
      type: new FormControl('line'),
      data: new FormArray([
        new FormControl(this.getRandomArbitrary(0, 100)),
        new FormControl(this.getRandomArbitrary(0, 100)),
        new FormControl(this.getRandomArbitrary(0, 100)),
        new FormControl(this.getRandomArbitrary(0, 100))
      ])
    }));
  }

  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


  getUserInfo(id) {
    this.rest.getResearcherInfo(id).subscribe((data: { message:any, Data: { user:any,image_url:any, studies:any,total_paid_amount:any, month:any,monthly_payment:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.user = data.Data.user;
        this.studies = data.Data.studies;
        this.total_paid_amount = data.Data.total_paid_amount;
        this.monthly_payment = data.Data.monthly_payment;
        this.months = data.Data.month;
        this.image_url = data.Data.image_url;
      }
    
  });
 }

  updateResearcherUserActiveStatus(id)
  {
    this.rest.updateActiveStatus(id).subscribe((data: { message: any }) => {
    if (data.message == 'user-activated') {
      this.getUserInfo(this.route.snapshot.params['id']); 
      this.toastr.success('User Activated', 'Success!');
      this.router.navigateByUrl('/overviewresearcheruser/' +this.user_id);
    } else {
      this.toastr.error('Status not Updated', 'Oops!');
      this.router.navigateByUrl('/overviewresearcheruser/' +this.user_id);
    }
  });
  }

  updateResearcherUserDeactiveStatus(id)
  {
    this.rest.updateDeactiveStatus(id).subscribe((data: { message: any }) => {
    if (data.message == 'user-deactivated') {
      this.getUserInfo(this.route.snapshot.params['id']); 
      
      this.toastr.success('User Deactivated', 'Success!');
      this.router.navigateByUrl('/overviewresearcheruser/' +this.user_id);
    } else {
      this.toastr.error('Status not Updated', 'Oops!');
      this.router.navigateByUrl('/overviewresearcheruser/' +this.user_id);
    }
  });
  }

}
