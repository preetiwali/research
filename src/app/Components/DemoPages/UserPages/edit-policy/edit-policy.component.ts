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
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.sass']
})
export class EditPolicyComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';

  editpolicy = new FormGroup({
    // country: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_type: new FormControl('')
  });


  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute ,private toastr: ToastrService) { }

  policy:any;

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

  ngOnInit() {
    this.getPolicy(this.route.snapshot.params['id']);
  }

  getPolicy(id) {
    this.rest.getPolicy(id).subscribe((data) => {
    this.policy = data.Data;
    });
  }


  editPolicy(id) {
    this.rest.updatePolicy(this.editpolicy.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'policy-updated') {
          this.toastr.success('Privacy Policy Updated', 'Success!');
          this.router.navigateByUrl('/privacypolicies');
      } else {
        this.toastr.error('Privacy Policy is not Updated', 'Oops!');
        this.router.navigateByUrl('/pages/editpolicy');
      }
    });
  }
}
