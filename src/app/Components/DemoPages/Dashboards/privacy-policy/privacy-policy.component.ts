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
import { ToastrService } from 'ngx-toastr';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.sass']
})
export class PrivacyPolicyComponent implements OnInit {
  
  heading = 'Privacy Policy';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';
  user_type:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    this.user_type = '';
    this.getPolicy();
  }

  policy:any;
  closeResult: string;
  policies: any;

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

  addpolicies = new FormGroup({
    country: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required)
  });

  editpolicy = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    user_type: new FormControl('')
  });

  getPolicy() {
    this.rest.getAdminPolicy().subscribe((data: { message:any , Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.policies = data;
      }
      
    });
  }


  editPolicy(id) {
    this.rest.updatePolicy(this.editpolicy.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'policy-updated') {
        $(".close").click();
          this.toastr.success('Privacy Policy Updated', 'Success!');
          this.router.navigateByUrl('/privacypolicies');
      } else {
        this.toastr.error('Privacy Policy is not Updated', 'Oops!');
        this.router.navigateByUrl('/privacypolicies');
      }
    });
  }

  addPolicy() {
    this.rest.addPolicy(this.addpolicies.value).subscribe((data: { message: any }) => {
      if (data.message === 'policy-added') {
        $(".close").click();
        this.getPolicy();
        this.toastr.success('Privacy Policy added successfully!', 'Success!');
        this.router.navigateByUrl('/privacypolicies');
      }else {
        $(".close").click();
        this.toastr.error('An error occured while adding Privacy Policy', 'Oops!');
        this.router.navigateByUrl('/privacypolicies');
      }
    }); 
  }


  deletePrivacyPolicy(id){
    this.rest.deletePrivacyPolicy(id).subscribe((data: { message: any }) => {
      if (data.message == 'privacy-policy-deleted') {
        $(".close").click();
        this.getPolicy();
        this.toastr.success('Privacy Policy Deleted', 'Success!');
        this.router.navigateByUrl('/privacypolicies');
      } else {
        $(".close").click();
        this.getPolicy();
        this.toastr.error('An error occured while deleted Privacy Policy', 'Oops!');
        this.router.navigateByUrl('/privacypolicies');
      } 
    });
  }
}
