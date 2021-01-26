import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {AngularEditorConfig} from '@kolkov/angular-editor';


@Component({
  selector: 'app-edit-terms',
  templateUrl: './edit-terms.component.html',
  styleUrls: ['./edit-terms.component.sass']
})
export class EditTermsComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';

  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  editterms = new FormGroup({
    // country: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_type: new FormControl('')
  });

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute ,private toastr: ToastrService) { }

  terms:any;

  ngOnInit() {
    this.getTerms(this.route.snapshot.params['id']);
  }

  getTerms(id) {
    this.rest.getTerms(id).subscribe((data) => {
    this.terms = data.Data;
    });
  }


  editTerms(id) {
    this.rest.updateTerms(this.editterms.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'terms-updated') {
          this.toastr.success('Terms $ Conditions Updated', 'Success!');
          this.router.navigateByUrl('/termsconditions');
      } else {
        this.toastr.error('Terms $ Conditions is not Updated', 'Oops!');
        this.router.navigateByUrl('/pages/editterms');
      }
    });
  }

}
