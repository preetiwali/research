import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../user';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from './../../../../api.service';
import { AuthService } from './../../../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.sass']
})
export class EditAdminComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';


  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute, private toastr: ToastrService) { }

  userInfo:any;

  ngOnInit() {
    this.getUserInfo(this.route.snapshot.params['id']);
  }

  getUserInfo(id) {
    const user_id = localStorage.getItem('user_id');
    this.rest.getInfoUser(user_id).subscribe((data) => {
    this.userInfo = data.Data.user;
    });
  }

  editprofile = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    contact_number: new FormControl('', Validators.required)
  });

  editProfile(id) {
    this.rest.updateProfile(this.editprofile.value, id).subscribe((data: { message: any }) => {
      if (data.message == 'Admin profile-updated') {
          this.toastr.success('User Profile Updated', 'Success!');
          this.router.navigateByUrl('/');
      } else {
        this.toastr.error('Admin Profile is not Updated', 'Oops!');
        this.router.navigateByUrl('/pages/editprofile');
      }
    });
  }


}
