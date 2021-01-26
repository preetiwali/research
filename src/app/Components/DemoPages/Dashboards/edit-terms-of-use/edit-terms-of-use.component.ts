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
  selector: 'app-edit-terms-of-use',
  templateUrl: './edit-terms-of-use.component.html',
  styleUrls: ['./edit-terms-of-use.component.sass']
})
export class EditTermsOfUseComponent implements OnInit {

  study:any;
  terms:any;

  heading = 'Terms of Use';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {

    this.getTermsOfUseInfo(); 
  }
    
  getTermsOfUseInfo() {
    this.rest.getTermsOfUseInfo().subscribe((data: { Data: { description:any } }) => {
    this.terms = data.Data.description;
    });
  }


}
