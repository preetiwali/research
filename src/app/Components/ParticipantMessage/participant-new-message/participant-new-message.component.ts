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
  selector: 'app-participant-new-message',
  templateUrl: './participant-new-message.component.html',
  styleUrls: ['./participant-new-message.component.sass']
})
export class ParticipantNewMessageComponent implements OnInit {

  heading = 'New Message';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-mail icon-gradient bg-tempting-azure';

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
  study_id:any;
  researcher_id:any;
  userid:any;
  message:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.userid = localStorage.getItem('user_id');
    this.researchId(this.route.snapshot.params['id']);
    this.getUserInfo();
    this.study_id =  this.route.snapshot.params['id']
  }

  newmessage = new FormGroup({
    reciever_id: new FormControl('', Validators.required),
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

  participantNewMessage() {
    this.newmessage.value.sender_id = this.research_worker_id;
    this.rest.newMessage(this.newmessage.value).subscribe((data: { message: any }) => {
      if (data.message === 'message-sent') {
        this.toastr.success('Message has been sent', 'Success!');
        this.router.navigateByUrl('/');
      } else if (data.message === 'message-not-sent') {
        this.toastr.success('Message has not been sent', 'Success!');
        this.router.navigateByUrl('/newmessage');
      } else {
        this.toastr.error('An error occured while sending message', 'Oops!');
        this.router.navigateByUrl('/newmessage');
      }
    }); 
  }


  researchId(id){
    this.rest.researchId(id).subscribe((data: {message:any, Data: { research_worker_id:any } }) => {
    if (data.message === 'unauthorised-user') {
      this.router.navigateByUrl('/');
    }
    else if(data.message == 'Study-not-found'){
      this.message = data.message;
    }
    else{
      this.researcher_id = data.Data.research_worker_id;
    }
  });
  }

}
