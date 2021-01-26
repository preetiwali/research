import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.sass']
})
export class TermsOfUseComponent implements OnInit {

  heading = 'Terms of Use';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal,private formBuilder: FormBuilder,private toastr: ToastrService) { }
              
  id:any;
  termsofuse:any;
  htmlContent = '';
  closeResult: string;
  message:any;
  description:any;

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
  

  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  descriptionform = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getTermsOfUse(); 
  }

  adddescriptionform = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  getTermsOfUse() {
    this.rest.getTermsOfUse().subscribe((data: {message:any, Data: {description:any, id:any} }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.termsofuse = data.Data;
        this.message = data.message;
        this.id = data.Data.id;
        this.description = data.Data.description;
      }
    });
  }

  editTermsOfUse(id) {
    this.rest.editTermsOfUse(this.descriptionform.value, id).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'terms-of-use-updated') {
        this.getTermsOfUse(); 
        this.toastr.success('Terms of Use Updated', 'Success!');
        this.router.navigateByUrl('/dashboards/termsofuse');
      } else {
        this.toastr.error('Terms of Use is not Updated', 'Oops!');
        this.router.navigateByUrl('/dashboards/termsofuse');
      }
    });
  }

  addTermsOfUse(){
    this.rest.addTermsOfUse(this.adddescriptionform.value).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'terms-of-use-saved') {
        this.getTermsOfUse(); 
        $(".close").click();
        this.toastr.success('Terms of Use Added', 'Success!');
        this.router.navigateByUrl('/dashboards/termsofuse');
      } else {
        this.toastr.error('Terms of Use is not Added', 'Oops!');
        this.router.navigateByUrl('/dashboards/termsofuse');
      }
    });
  }
}
