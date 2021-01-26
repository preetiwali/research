import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';
  closeResult: string;
  user_type:any;
  user:any;


  constructor(private authService: AuthService, public rest: ApiService,private modalService: NgbModal , private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/pages/login-boxed');
    }
  }

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


  formGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
 

  handleValidSubmit() {
    this.rest.checkUserLogin(this.formGroup.value).subscribe((data: { message: any, login_count:any, user: { user_type:any, authentication_token: any, id:any }}) => {
      if (data.message === "user-logged-in") {
        this.authService.setSessionUser(data);
        // this.router.navigateByUrl('/');
        if(data.user.user_type == "Researcher"){
          this.router.navigateByUrl('/Researcher');
        }
        else if(data.user.user_type == "Researcher" && data.login_count == 1){
          this.router.navigateByUrl('/researcherfirstlogin');
        }else if(data.user.user_type == "Participant" && data.login_count == 1){
          this.router.navigateByUrl('/');
          // this.router.navigateByUrl('/?user_type=' + data.user.user_type);
        } else{
          this.router.navigateByUrl('/');
        }
      } else if(data.message === "user-not-verified"){
        this.toastr.warning('Your account has not been verified yet Please check your email!', 'Warning');
        this.router.navigateByUrl('/pages/login-boxed');
      } else if(data.message === "waiting for admin approval"){
        this.toastr.warning('Waiting for admin approval!', 'Warning');
        this.router.navigateByUrl('/pages/login-boxed');
      } else if(data.message === "account is deactivate"){
        alert("Your account is deactivate. To activate your account please email to this link : help@researchsquare.ae");
        // this.toastr.warning('Your account is deactive please contact admin to active your account', 'Warning');
        this.router.navigateByUrl('/pages/login-boxed');
      }else {
        this.toastr.error(' Credentials are incorrect!');
        this.router.navigateByUrl('/pages/login-boxed');
      }
    });
  }


  ValidateLogin(){
    var email = (<HTMLInputElement>document.getElementById("validationemail")).value;
    var password = (<HTMLInputElement>document.getElementById("validationCustom01")).value;
  
    if( typeof(email) != null && (email) != "" && (password) != null && (password) != ""){

        document.getElementById("validationemail").classList.remove("ng-invalid");
        document.getElementById("validationemail").classList.remove("is-invalid");
  
        document.getElementById("validationemail").classList.remove("ng-valid");
        document.getElementById("validationemail").classList.remove("is-valid");

        document.getElementById("validationCustom01").classList.remove("ng-invalid");
        document.getElementById("validationCustom01").classList.remove("is-invalid");
  
        document.getElementById("validationCustom01").classList.remove("ng-valid");
        document.getElementById("validationCustom01").classList.remove("is-valid");
  
      }
    }

}




