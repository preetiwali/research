import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password-user',
  templateUrl: './update-password-user.component.html',
  styleUrls: ['./update-password-user.component.sass']
})
export class UpdatePasswordUserComponent implements OnInit {

  token:any;
  passwordmatch:boolean = false;

  updatepassword = new FormGroup({
    confirmpassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token']; 
  }

  handleValidSubmit() {
    this.updatepassword.value.token = this.token;
      this.rest.changeUserPass(this.updatepassword.value).subscribe((data: { message: any }) => {
        if (data.message === 'Password-changed') {
          this.toastr.success('Password Updated', 'Success');
          this.router.navigateByUrl('/pages/login-boxed');

        } else if(data.message === 'expired'){
          this.toastr.error('Link not valid or expired','Error');
          this.router.navigateByUrl('pages/updatepassword');
        } else {
          this.toastr.error('An error occured while registering user!','Error');
          this.router.navigateByUrl('pages/updatepassword');
        }
      }); 
  } 

  //  update password

updatePassword1(){
  var password = (<HTMLInputElement>document.getElementById("updatepassword")).value;
  var confirm_password = (<HTMLInputElement>document.getElementById("updateconfirmpassword")).value;

  if( typeof(password) !== null && (password) != "" && confirm_password === password){
    this.passwordmatch = true;
      document.getElementById("updatepassword").classList.remove("ng-invalid");
      document.getElementById("updatepassword").classList.remove("is-invalid");

      document.getElementById("updateupdatepasswordpassword").classList.add("ng-valid");
      document.getElementById("updatepassword").classList.add("is-valid");


      document.getElementById("updateconfirmpassword").classList.remove("ng-invalid");
      document.getElementById("updateconfirmpassword").classList.remove("is-invalid");

      document.getElementById("updateconfirmpassword").classList.add("ng-valid");
      document.getElementById("updateconfirmpassword").classList.add("is-valid");

    } else {
      this.passwordmatch = false;
      document.getElementById("updatepassword").classList.remove("ng-valid");
      document.getElementById("updatepassword").classList.remove("is-valid");

      document.getElementById("updateconfirmpassword").classList.remove("ng-valid");
      document.getElementById("updateconfirmpassword").classList.remove("is-valid");

      document.getElementById("updateconfirmpassword").classList.add("ng-invalid");
      document.getElementById("updateconfirmpassword").classList.add("is-invalid");

    }
  }

  
 updateConfirmPassword1(){
  var confirm_password = (<HTMLInputElement>document.getElementById("updateconfirmpassword")).value;
  var password = (<HTMLInputElement>document.getElementById("updatepassword")).value;

  if( confirm_password === password){
    this.passwordmatch = true;
      document.getElementById("updateconfirmpassword").classList.remove("ng-invalid");
      document.getElementById("updateconfirmpassword").classList.remove("is-invalid");

      document.getElementById("updateconfirmpassword").classList.add("ng-valid");
      document.getElementById("updateconfirmpassword").classList.add("is-valid");

      document.getElementById("updatepassword").classList.remove("ng-invalid");
      document.getElementById("updatepassword").classList.remove("is-invalid");

      document.getElementById("updatepassword").classList.add("ng-valid");
      document.getElementById("updatepassword").classList.add("is-valid");


    } else {
      this.passwordmatch = false;
      document.getElementById("updateconfirmpassword").classList.remove("ng-valid");
      document.getElementById("updateconfirmpassword").classList.remove("is-valid");

      document.getElementById("updateconfirmpassword").classList.add("ng-invalid");
      document.getElementById("updateconfirmpassword").classList.add("is-invalid");

      document.getElementById("updatepassword").classList.remove("ng-valid");
      document.getElementById("updatepassword").classList.remove("is-valid");

    }
}
}
