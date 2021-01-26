import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-new-study-description',
  templateUrl: './edit-new-study-description.component.html',
  styleUrls: ['./edit-new-study-description.component.sass']
})
export class EditNewStudyDEscriptionComponent implements OnInit {

  heading = 'Edit Study Description';
  subheading = 'Need to add formatting to your forms? Use these Vue2 widgets.';
  icon = 'pe-7s-like icon-gradient bg-love-kiss';

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

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }

    studydescription:any;
    id:any;

  ngOnInit() {
    
    this.getStudyInfo(this.route.snapshot.params['id']); 
  }
    
  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { message:any, Data: {} }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.studydescription = data.Data;
        $('study').contents().find('.angular-editor-textarea').append('<div class="angular-editor-textarea" id="editor" contenteditable="true" translate="no" spellcheck="false" style="height: 15rem; min-height: 5rem;">' + this.studydescription + '</div>');
      }
    });
  }

  editstudydescription = new FormGroup({
    description: new FormControl('')
  });


  editStudyDescription(id) {
    this.editstudydescription.value.id = this.id;
    this.rest.studyDescription(this.editstudydescription.value).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'description-added') {
          this.toastr.success('Study Description Updated', 'Success!');
          this.router.navigateByUrl('/studypublished/' +data.Data.id);
      }else if(data.message === 'insufficient-length'){
        $('#description').css('display','block');
        this.router.navigateByUrl('/editstudydescription/'+data.Data.id);
      } else {
        this.toastr.error('Study Description is not Updated', 'Oops!');
        this.router.navigateByUrl('/editstudydescription/'+data.Data.id);
      }
    });
  }


}
