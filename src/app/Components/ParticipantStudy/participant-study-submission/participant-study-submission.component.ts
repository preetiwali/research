import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Color} from 'ng2-charts';


@Component({
  selector: 'app-participant-study-submission',
  templateUrl: './participant-study-submission.component.html',
  styleUrls: ['./participant-study-submission.component.sass']
})
export class ParticipantStudySubmissionComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }

  total_submission:any;
  total_attempt:any;
  accepted_studies:any;
  rejected_studies:any;
  user_id:any;

  ngOnInit() {
    this.getparticipantSubmissionInfo(this.route.snapshot.params['id']); 
    this.user_id =  this.route.snapshot.params['id']
  }
      
  getparticipantSubmissionInfo(id) {
    this.rest.getparticipantSubmissionInfo(id).subscribe((data: { Data: { total_submission:any, total_attempt:any, accepted_studies:any, rejected_studies:any } }) => {
    this.total_submission = data.Data.total_submission;
    this.total_attempt = data.Data.total_attempt;
    this.accepted_studies = data.Data.accepted_studies;
    this.rejected_studies = data.Data.rejected_studies;
    });
  }
  

  public datasets = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 46, 55, 38, 59, 80],
      datalabels: {
        display: false,
      },
    }
  ];

  public datasets2 = [
    {
      label: 'My First dataset',
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },
    }
  ];

  public datasets3 = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },
    }
  ];

  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: '#F2DD6E',
      borderColor: '#f7b924',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f7b924',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f7b924',
    },
  ];



  public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };

}

