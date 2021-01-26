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
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-accounts-participants',
  templateUrl: './accounts-participants.component.html',
  styleUrls: ['./accounts-participants.component.sass'],
  providers: [DatePipe]
})
export class AccountsParticipantsComponent implements OnInit {

  participantusers: any;
  user: any;
  status: any;
  closeResult: string;
  selectedFile:any;
  image_url:any;
  passwordmatch:boolean = false;
  min_to_date:any;

  constructor(public rest: ApiService, private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder,
              private modalService: NgbModal ,private toastr: ToastrService, public datePipe: DatePipe) { }

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
 
  editinfo = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    contact_number: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required)
  });


  referinfo = new FormGroup({
    email: new FormControl('', Validators.required)
  });


  changeparticipantpassword = new FormGroup({
    currentpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
  });


  uploadImage  =  new FormGroup({
    image_url: new FormControl('')
  });


  ngOnInit() {
    const new_date = new Date();
    this.getParticipantUsers(localStorage.getItem('user_id'));
    this.min_to_date = this.datePipe.transform(new_date, 'yyyy-MM-dd');
  }
  

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    this.router.navigate(['/pages/login-boxed']);

  }


  getParticipantUsers(id) {
    this.rest.getAllParticipantUsers(id).subscribe((data: { Data: { user:any, image_url:any } }) => {
      this.participantusers = data.Data.user;
      this.image_url = data.Data.image_url;
    });
  }


  editNameInfo(id) {
    this.rest.updateProfile(this.editinfo.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'user-profile-updated') {
        $(".close").click();
        this.toastr.success('User Basic Info Updated', 'Success!');
        this.router.navigateByUrl('/accountparticipant');
      } else {
        $(".close").click();
        this.toastr.error('User Basic Info is not Updated', 'Oops!');
        this.router.navigateByUrl('/accountparticipant');
      }
    });
  }


  referInfo() {
    this.rest.referInfo(this.referinfo.value).subscribe((data: { message: any }) => {
      if (data.message == 'Code-shared') {
        $(".close").click();
        this.toastr.success('Refer code shared', 'Success!');
        this.router.navigateByUrl('/accountparticipant');
      } else {
        $(".close").click();
        this.toastr.error('An error occured while refer code!', 'Oops!');
        this.router.navigateByUrl('/accountparticipant');
      }
    });
  }


  changePassword()
  {
    this.changeparticipantpassword.value.user_id = localStorage.getItem('user_id');
    this.rest.changeUserPassword(this.changeparticipantpassword.value).subscribe((data: { message: any }) => {
      if (data.message === 'Password-changed') {
        $(".close").click();
        this.toastr.success('Password Changed!', 'Success');
        this.router.navigateByUrl('/accountparticipant');
      } else if(data.message === 'Password-mismatch'){
        $(".close").click();
        this.toastr.error('Password Mismatch!','Error');
        this.router.navigateByUrl('/accountparticipant');
      } else {
        $(".close").click();
        this.toastr.error('An error occured while change password!','Error');
        this.router.navigateByUrl('/accountparticipant');
      }
    }); 
  }


  deleteAccountParticipant(id) {
    this.rest.deleteAccountParticipant(id).subscribe((data: { message: any }) => {
      if (data.message == 'account-deactivated') {
          this.logout();
          $(".close").click();
          this.router.navigateByUrl('/pages/login-boxed');
      } else if(data.message === 'account-not-deactivated'){
        $(".close").click();
        this.toastr.warning('you should have 0 wallet money to deactivate your account','Warning');
        this.router.navigateByUrl('/accountparticipant');
      } else {
        this.logout();
        $(".close").click();
        this.router.navigateByUrl('/accountparticipant');
      }
    });
  }


  CheckPassword()
  {
    this.changeparticipantpassword.value.user_id = localStorage.getItem('user_id');
    this.changeparticipantpassword.value.currentpassword = this.changeparticipantpassword.value.currentpassword;

    this.rest.CheckPassword(this.changeparticipantpassword.value).subscribe((data: { message: any }) => {
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
    this.selectedFile = $event.target.files[0];
    this.uploadImage.controls['image_url'].setValue(this.selectedFile ? this.selectedFile : ''); 
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
              this.getParticipantUsers(localStorage.getItem('user_id'));
              this.toastr.success('Image updated', 'Success!');
              this.router.navigateByUrl('/accountparticipant');
            } else {
              this.toastr.error('An error occured while updating image', 'Oops!');
              this.router.navigateByUrl('/accountparticipant');
            }
          });
        }
        else
        {
          this.toastr.error('Please select an image', 'Oops!');
        }
  }
 


   changeUserPassword(){
    var password = (<HTMLInputElement>document.getElementById("changeuserpassword")).value;
    var confirm_password = (<HTMLInputElement>document.getElementById("userchangeconfirmpassword")).value;
  
    if( typeof(password) !== null && (password) != "" && confirm_password === password){
      this.passwordmatch = true;
        document.getElementById("changeuserpassword").classList.remove("ng-invalid");
        document.getElementById("changeuserpassword").classList.remove("is-invalid");
      
        document.getElementById("changeuserpassword").classList.add("ng-valid");
        document.getElementById("changeuserpassword").classList.add("is-valid");
  
        document.getElementById("userchangeconfirmpassword").classList.remove("ng-invalid");
        document.getElementById("userchangeconfirmpassword").classList.remove("is-invalid");
  
        document.getElementById("userchangeconfirmpassword").classList.add("ng-valid");
        document.getElementById("userchangeconfirmpassword").classList.add("is-valid");
  
      } else {
        this.passwordmatch = false;
        document.getElementById("changeuserpassword").classList.remove("ng-valid");
        document.getElementById("changeuserpassword").classList.remove("is-valid");
  
        document.getElementById("userchangeconfirmpassword").classList.remove("ng-valid");
        document.getElementById("userchangeconfirmpassword").classList.remove("is-valid");
  
        document.getElementById("userchangeconfirmpassword").classList.add("ng-invalid");
        document.getElementById("userchangeconfirmpassword").classList.add("is-invalid");
      }
    }
  
    
  
  changeUserConfirmPassword(){
    var confirm_password = (<HTMLInputElement>document.getElementById("userchangeconfirmpassword")).value;
    var password = (<HTMLInputElement>document.getElementById("changeuserpassword")).value;
  
    if( confirm_password === password){
      this.passwordmatch = true;
        document.getElementById("userchangeconfirmpassword").classList.remove("ng-invalid");
        document.getElementById("userchangeconfirmpassword").classList.remove("is-invalid");
  
        document.getElementById("userchangeconfirmpassword").classList.add("ng-valid");
        document.getElementById("userchangeconfirmpassword").classList.add("is-valid");
  
        document.getElementById("changeuserpassword").classList.remove("ng-invalid");
        document.getElementById("changeuserpassword").classList.remove("is-invalid");
  
        document.getElementById("changeuserpassword").classList.add("ng-valid");
        document.getElementById("changeuserpassword").classList.add("is-valid");
  
  
      } else {
        this.passwordmatch = false;
        document.getElementById("userchangeconfirmpassword").classList.remove("ng-valid");
        document.getElementById("userchangeconfirmpassword").classList.remove("is-valid");
  
        document.getElementById("userchangeconfirmpassword").classList.add("ng-invalid");
        document.getElementById("userchangeconfirmpassword").classList.add("is-invalid");
  
        document.getElementById("changeuserpassword").classList.remove("ng-valid");
        document.getElementById("changeuserpassword").classList.remove("is-valid");
      }
  }


}
