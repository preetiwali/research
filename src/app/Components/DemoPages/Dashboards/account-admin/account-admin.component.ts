import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../api.service';
import { FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.sass']
})
export class AccountAdminComponent implements OnInit {

  adminusers: any;
  user: any;
  status: any;
  closeResult: string;
  selectedFile:any;
  image_url:any;
  passwordmatch:boolean = false;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private modalService: NgbModal ,private toastr: ToastrService) { }

  ngOnInit() {
    this.getAdminUsers(localStorage.getItem('user_id'));
  }

  changepassword = new FormGroup({
    currentpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  });

  uploadImage  =  new FormGroup({
    image_url: new FormControl('')
  });
 
  editadminprofile = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
  }

  getAdminUsers(id) {
    this.rest.getAllResearcherUsers(id).subscribe((data: { Data: { user:any ,image_url:any} }) => {
      this.adminusers = data.Data.user;
      this.image_url = data.Data.image_url;
    });
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
  
  editAdminProfile(id) {
    this.rest.updateProfile(this.editadminprofile.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'user-profile-updated') {
        $(".close").click();
        this.toastr.success('Admin Profile Updated', 'Success!');
        this.router.navigateByUrl('/accountadmin');
      } else {
        this.toastr.error('Admin Profile is not Updated', 'Oops!');
        this.router.navigateByUrl('/accountadmin');
      }
    });
  }

  changePassword()
  {
    this.changepassword.value.user_id = localStorage.getItem('user_id');
    this.rest.changeUserPassword(this.changepassword.value).subscribe((data: { message: any }) => {
      if (data.message === 'Password-changed') {
        $(".close").click();
        this.changepassword.value.reset();
        this.toastr.success('Password Changed!', 'Success');
        this.router.navigateByUrl('/accountadmin');
      } else if(data.message === 'Password-mismatch'){
        this.toastr.error('Password Mismatch!','Error');
        this.router.navigateByUrl('/accountadmin');
      } else {
        this.toastr.error('An error occured while change password!','Error');
        this.router.navigateByUrl('/accountadmin');
      }
    }); 
  }

  deleteAccountResearcher(id) {
    this.rest.deleteAccountResearcher(id).subscribe((data: { message: any }) => {
      if (data.message == 'user-deleted') {
        $(".close").click();
          this.logout();
          this.router.navigateByUrl('/pages/signup');
      } else {
        this.logout();
        this.router.navigateByUrl('/pages/signup');
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

  onFileChange($event) {
    this.selectedFile = $event.target.files[0]; // <--- File Object for future use.
    this.uploadImage.controls['image_url'].setValue(this.selectedFile ? this.selectedFile : ''); // <-- Set Value for Validation
  }

  updateProfileImage(id)
  {
    const user_id = localStorage.getItem('user_id');
      const fd = new FormData();
    $('.user_id_proof_img').removeClass('display_none');
      // this.updateProfileImageForm.value
        if(this.selectedFile != null)
        {
          fd.append('file', this.selectedFile, this.selectedFile.name);
          this.rest.updateProfileImage(fd,id).subscribe((data: { message: any }) => {
            if (data.message === 'user-profile-updated') {
              $(".close").click();
              this.getAdminUsers(localStorage.getItem('user_id'));
              this.toastr.success('Image updated', 'Success!');
              this.router.navigateByUrl('/accountadmin');
            } else {
              this.toastr.error('An error occured while updating image', 'Oops!');
              this.router.navigateByUrl('/accountadmin');
            }
          });
        }
        else
        {
          this.toastr.error('Please select an image', 'Oops!');
        }
  }

  changeAdminPassword(){
    var password = (<HTMLInputElement>document.getElementById("changeresearcherpassword")).value;
    var confirm_password = (<HTMLInputElement>document.getElementById("researcherchangeconfirmpassword")).value;
    if( typeof(password) !== null && (password) != "" && confirm_password === password){
      this.passwordmatch = true;
        document.getElementById("changeresearcherpassword").classList.remove("ng-invalid");
        document.getElementById("changeresearcherpassword").classList.remove("is-invalid");
  
        document.getElementById("changeresearcherpassword").classList.add("ng-valid");
        document.getElementById("changeresearcherpassword").classList.add("is-valid");
  
        document.getElementById("researcherchangeconfirmpassword").classList.remove("ng-invalid");
        document.getElementById("researcherchangeconfirmpassword").classList.remove("is-invalid");
  
        document.getElementById("researcherchangeconfirmpassword").classList.add("ng-valid");
        document.getElementById("researcherchangeconfirmpassword").classList.add("is-valid");
  
      } else {
        this.passwordmatch = false;
        document.getElementById("changeresearcherpassword").classList.remove("ng-valid");
        document.getElementById("changeresearcherpassword").classList.remove("is-valid");
  
        document.getElementById("researcherchangeconfirmpassword").classList.remove("ng-valid");
        document.getElementById("researcherchangeconfirmpassword").classList.remove("is-valid");
  
        document.getElementById("researcherchangeconfirmpassword").classList.add("ng-invalid");
        document.getElementById("researcherchangeconfirmpassword").classList.add("is-invalid");
  
      }
    }
  
   changeAdminConfirmPassword(){
    var confirm_password = (<HTMLInputElement>document.getElementById("researcherchangeconfirmpassword")).value;
    var password =  (<HTMLInputElement>document.getElementById("changeresearcherpassword")).value;
  
    if( confirm_password === password){
      this.passwordmatch = true;
        document.getElementById("researcherchangeconfirmpassword").classList.remove("ng-invalid");
        document.getElementById("researcherchangeconfirmpassword").classList.remove("is-invalid");
  
        document.getElementById("researcherchangeconfirmpassword").classList.add("ng-valid");
        document.getElementById("researcherchangeconfirmpassword").classList.add("is-valid");
  
        document.getElementById("changeresearcherpassword").classList.remove("ng-invalid");
        document.getElementById("changeresearcherpassword").classList.remove("is-invalid");
  
        document.getElementById("changeresearcherpassword").classList.add("ng-valid");
        document.getElementById("changeresearcherpassword").classList.add("is-valid");
  
      } else {
        this.passwordmatch = false;
        document.getElementById("researcherchangeconfirmpassword").classList.remove("ng-valid");
        document.getElementById("researcherchangeconfirmpassword").classList.remove("is-valid");
  
        document.getElementById("researcherchangeconfirmpassword").classList.add("ng-invalid");
        document.getElementById("researcherchangeconfirmpassword").classList.add("is-invalid");
  
        document.getElementById("changeresearcherpassword").classList.remove("ng-valid");
        document.getElementById("changeresearcherpassword").classList.remove("is-valid");
      }
    }

}
