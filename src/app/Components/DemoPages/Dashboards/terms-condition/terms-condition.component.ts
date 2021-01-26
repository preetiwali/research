import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.sass']
})
export class TermsConditionComponent implements OnInit {

  heading = 'Terms & Conditions';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  terms:any;
  closeResult: string;
  user_type:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,private toastr: ToastrService
              ,private modalService: NgbModal) { }

  ngOnInit() {
    this.user_type = this.route.snapshot.params['user_type']
    this.getTerms();
  }

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

  getTerms() {
    this.rest.getAdminTerms().subscribe((data:{ message:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.terms = data;
      }
    });
  }

  addterms = new FormGroup({
    country: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required)
  });

  editterms = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_type: new FormControl('')
  });

  addTerms() {
    this.rest.addTerms(this.addterms.value).subscribe((data: { message: any }) => {
      if (data.message === 'terms-added') {
        $(".close").click();
        this.getTerms();
        this.toastr.success('Terms & Condition added successfully!', 'Success!');
        this.router.navigateByUrl('/termsconditions');
      }else {
        $(".close").click();
        this.getTerms();
        this.toastr.error('An error occured while adding Terms & Condition', 'Oops!');
        this.router.navigateByUrl('/termsconditions');
      }
    }); 
  }


  editTerms(id) {
    this.rest.updateTerms(this.editterms.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'terms-updated') {
        $(".close").click();
        this.getTerms();
        this.toastr.success('Terms $ Conditions Updated', 'Success!');
        this.router.navigateByUrl('/termsconditions');
      } else {
        this.getTerms();
        this.toastr.error('Terms $ Conditions is not Updated', 'Oops!');
        this.router.navigateByUrl('/termsconditions');
      }
    });
  }


  deleteTermConditions(id){
    this.rest.deleteTermConditions(id).subscribe((data: { message: any }) => {
      if (data.message == 'terms-deleted') {
        $(".close").click();
        this.getTerms();
        this.toastr.success('Terms & Conditions Deleted', 'Success!');
        this.router.navigateByUrl('/termsconditions');
      } else {
        $(".close").click();
        this.getTerms();
        this.toastr.error('An error occured while deleted Terms & Conditions', 'Oops!');
        this.router.navigateByUrl('/termsconditions');
      } 
    });
  }
}
