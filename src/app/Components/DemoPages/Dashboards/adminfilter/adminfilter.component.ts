import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-adminfilter',
  templateUrl: './adminfilter.component.html',
  styleUrls: ['./adminfilter.component.sass']
})
export class AdminfilterComponent implements OnInit {

  categories: any;
  category_id:any;
  
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.rest.getAllCategory().subscribe((data: { message:any, Data: { question_categories:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.categories = data.Data.question_categories;
      }
      
    });
  }
}
