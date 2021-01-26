import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';

  editprofile = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    contact_number: new FormControl('', Validators.required),
    image_url: new FormControl('')
  });

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute, private toastr: ToastrService) { }

  userInfo:any;
  selectedFile:any;
  image_url:any;

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']);
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getInfoUser(user_id).subscribe((data) => {
    this.userInfo = data.Data.user;
    this.image_url = data.Data.image_url;
    });
  }

  editProfile(id) {
    this.rest.updateProfile(this.editprofile.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'user-profile-updated') {
          this.toastr.success('User Profile Updated', 'Success!');
          this.router.navigateByUrl('/');
      } else {
        this.toastr.error('User Profile is not Updated', 'Oops!');
        this.router.navigateByUrl('/pages/editprofile');
      }
    });
  }

 
}
