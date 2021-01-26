import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-passowrd-user',
  templateUrl: './change-passowrd-user.component.html',
  styleUrls: ['./change-passowrd-user.component.sass']
})
export class ChangePassowrdUserComponent implements OnInit {

  changepassword = new FormGroup({
    currentpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  });

  currentPassword:any;
  passwordmatch:boolean = true;

  constructor(public authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
  }

  logout() {
    window.location.reload();
    this.authService.logout();
    this.router.navigateByUrl('/pages/login-boxed');
  }

  changePassword()
  {
    this.changepassword.value.user_id = localStorage.getItem('user_id');
    this.rest.changeUserPassword(this.changepassword.value).subscribe((data: { message: any }) => {
      if (data.message === 'Password-changed') {
        this.toastr.success('Password Changed!', 'Success');
        this.logout();
      } else if(data.message === 'Password-mismatch'){
        this.toastr.error('Password Mismatch!','Error');
        this.router.navigateByUrl('pages/changepassword');
      } else {
        this.toastr.error('An error occured while registering user!','Error');
        this.router.navigateByUrl('pages/changepassword');
      }
    }); 
  }

  CheckPassword()
  {
    this.changepassword.value.user_id = localStorage.getItem('user_id');
    this.changepassword.value.currentpassword = this.changepassword.value.currentpassword;

    this.rest.CheckPassword(this.changepassword.value).subscribe((data: { message: any }) => {
      if( data.message === 'Password-match'){

        document.getElementById("currentpass").classList.remove("ng-invalid");
        document.getElementById("currentpass").classList.remove("is-invalid");

        document.getElementById("currentpass").classList.add("ng-valid");
        document.getElementById("currentpass").classList.add("is-valid");
      } else {
       
        document.getElementById("currentpass").classList.remove("ng-valid");
        document.getElementById("currentpass").classList.remove("is-valid");
  
        document.getElementById("currentpass").classList.add("ng-invalid");
        document.getElementById("currentpass").classList.add("is-invalid");
      }
    }); 
  }



//  change password
Password(){
  var password = (<HTMLInputElement>document.getElementById("changepassword")).value;
  var confirm_password = (<HTMLInputElement>document.getElementById("changeconfirmpassword")).value;

  if( typeof(password) !== null && (password) != "" && confirm_password === password){
    this.passwordmatch = true;

    document.getElementById("changepassword").classList.remove("ng-invalid");
    document.getElementById("changepassword").classList.remove("is-invalid");

    document.getElementById("changepassword").classList.add("ng-valid");
    document.getElementById("changepassword").classList.add("is-valid");

    document.getElementById("changeconfirmpassword").classList.remove("ng-invalid");
    document.getElementById("changeconfirmpassword").classList.remove("is-invalid");

    document.getElementById("changeconfirmpassword").classList.add("ng-valid");
    document.getElementById("changeconfirmpassword").classList.add("is-valid");

    } else {

    this.passwordmatch = false;
    document.getElementById("changepassword").classList.remove("ng-valid");
    document.getElementById("changepchangepasswordassword").classList.remove("is-valid");

    document.getElementById("changeconfirmpassword").classList.remove("ng-valid");
    document.getElementById("changeconfirmpassword").classList.remove("is-valid");

    document.getElementById("changeconfirmpassword").classList.add("ng-invalid");
    document.getElementById("changeconfirmpassword").classList.add("is-invalid");

    }
  }


ConfirmPassword(){
  var confirm_password = (<HTMLInputElement>document.getElementById("changeconfirmpassword")).value;
  var password = (<HTMLInputElement>document.getElementById("changepassword")).value;

  if( confirm_password === password){
    this.passwordmatch = true;

      document.getElementById("changeconfirmpassword").classList.remove("ng-invalid");
      document.getElementById("changeconfirmpassword").classList.remove("is-invalid");

      document.getElementById("changeconfirmpassword").classList.add("ng-valid");
      document.getElementById("changeconfirmpassword").classList.add("is-valid");

      document.getElementById("changepassword").classList.remove("ng-invalid");
      document.getElementById("changepassword").classList.remove("is-invalid");

      document.getElementById("changepassword").classList.add("ng-valid");
      document.getElementById("changepassword").classList.add("is-valid");


    } else {

      this.passwordmatch = false;
      document.getElementById("changeconfirmpassword").classList.remove("ng-valid");
      document.getElementById("changeconfirmpassword").classList.remove("is-valid");

      document.getElementById("changeconfirmpassword").classList.add("ng-invalid");
      document.getElementById("changeconfirmpassword").classList.add("is-invalid");

      document.getElementById("changepassword").classList.remove("ng-valid");
      document.getElementById("changepassword").classList.remove("is-valid");
    }
}

}
