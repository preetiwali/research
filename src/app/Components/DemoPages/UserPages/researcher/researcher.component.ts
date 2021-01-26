import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.sass']
})
export class ResearcherComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';

  formGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    referral_code: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    organisation: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    terms: new FormControl(false, Validators.required),
    user_type: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }


  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  handleReset() {
    this.formGroup.reset();
  }

}
