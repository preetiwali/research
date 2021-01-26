import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-researcher-helpmessage',
  templateUrl: './researcher-helpmessage.component.html',
  styleUrls: ['./researcher-helpmessage.component.sass']
})
export class ResearcherHelpmessageComponent implements OnInit {

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

  research_worker_id:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  helpmessage = new FormGroup({
    subject: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

    getUserInfo() {
      const user_id = localStorage.getItem('user_id');
      this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:any } }) => {
      if (data.message === 'user-info') {
        this.research_worker_id = data.Data.user.research_worker_id;
      }
    });
  }

  helpMessage() {
    this.helpmessage.value.email = 'help@researchsquare.ae';
    this.rest.newMessage(this.helpmessage.value).subscribe((data: { message: any }) => {
      if (data.message === 'message-sent') {
        this.toastr.success('Message has been sent', 'Success!');
        this.router.navigateByUrl('/');
      } else if (data.message === 'message-not-sent') {
        this.toastr.success('Message has not been sent', 'Success!');
        this.router.navigateByUrl('/researcherhelpmessage');
      } else {
        this.toastr.error('An error occured while sending message', 'Oops!');
        this.router.navigateByUrl('/researcherhelpmessage');
      }
    }); 
  }

}
