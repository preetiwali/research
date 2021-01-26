import {Component, OnInit} from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from './../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-researcher-help-content',
  templateUrl: './researcher-help-content.component.html',
  styleUrls: ['./researcher-help-content.component.sass']
})
export class ResearcherHelpContentComponent implements OnInit {

  panelOpenState = false;
  isDisabled = true;
  step = 0;
  contentList:any;
  faq:any;

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getContent(14);
    this.getHelpFAQ();
  }

  getContent(id) {
    this.rest.getContent(id).subscribe((data: { message:any , Data:{content:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.contentList = data.Data;
      }
    });
  }


  getHelpFAQ() {
    this.rest.getResearcherHelpFAQ().subscribe((data: { message:any, Data: { question_categories:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.faq = data.Data;
      }
      
    });
  }

}
