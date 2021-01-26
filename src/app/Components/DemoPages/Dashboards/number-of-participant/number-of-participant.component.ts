import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ChartComponent} from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-number-of-participant',
  templateUrl: './number-of-participant.component.html',
  styleUrls: ['./number-of-participant.component.sass']
})
export class NumberOfParticipantComponent implements OnInit {

  form: FormGroup;
  numberofparticipant:any;
  participant:any;
  months:any;
  studies:any;
  numberofresearcher:any;
  UAEstudies:any;
  indianstudies:any;
  countrywise_researcher_count:any;
  participant_country:any;
  researcher_country:any;
  countrywise_participant_count:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal ,private toastr: ToastrService) {

    this.form = new FormGroup({
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


  ngOnInit() {
    this.getRecords();
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


  getRecords() {
    this.rest.getReports().subscribe((data: { Data:any , message:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.numberofparticipant = data.Data.participant;
        this.numberofresearcher = data.Data.researcher;
        this.months = data.Data.month;
        this.studies = data.Data.study;
        this.indianstudies = data.Data.indian_studies;
        this.UAEstudies = data.Data.UAE_studies;
        this.participant_country = data.Data.participant_country;
        this.researcher_country = data.Data.researcher_country;
        this.countrywise_participant_count = data.Data.countrywise_participant_count;
        this.countrywise_researcher_count = data.Data.countrywise_researcher_count;

      }
      
    });
  }

}
