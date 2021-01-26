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
  selector: 'app-researcherstudydata',
  templateUrl: './researcherstudydata.component.html',
  styleUrls: ['./researcherstudydata.component.sass']
})
export class ResearcherstudydataComponent implements OnInit {

  study:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {

    this.getStudyInfo(this.route.snapshot.params['id']); 
  }
    
  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { Data: {} }) => {
    this.study = data.Data;
    });
  }
}
