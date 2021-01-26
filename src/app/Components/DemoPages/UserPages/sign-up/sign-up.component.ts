import { Component, NgModule, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';import { ToastrService } from 'ngx-toastr';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {BrowserModule} from '@angular/platform-browser';
import * as $ from 'jquery';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  heading = 'Form Validation';
  subheading = 'Inline validation is very easy to implement using the ArchitectUI Framework.';
  icon = 'lnr-picture text-danger';
  message : any;
  validators:any;
  myForm: FormGroup;
  disabled = false;
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  passwordmatch:boolean = false;
    errors:any;

  config = {
    displayKey: 'name',
    search: true,
    limitTo: 3
  };

  job = [
    'Student',
    'Academic',
    'Individual'
  ];

  selectedJob = 'Type of job';
  selectedCountry = 'Country of Residence';
  selectedCity = 'City of Residence';
  selectedNationality = 'Nationality';
  selectedSpecialisation = 'Area of Specialisation';
  selectedheard_from = 'How did you hear about us?';
  selectedDepartment = 'Department';

  specialisationarea = [
    'Academia',
    'Marketing',
    'Market Research',
    'Health or Health Tech',
    'Human Resource or Recruitment',
    'Research Service or Consultancy',
    'Business Consultancy',
    'Technology or Software Development',
    'Financial Services',
    'Policy, Charity or Substainability',
    'Student',
    'Other'
  ];

  heard_from = [
    'Facebook',
    'Twitter',
    'LinkedIn',
    'Friends',
    'Online',
    'University'
  ];

  department =[
    'Business', 'Finance', 'Human Resource Management', 'Marketing', 'Medical', 'Operations', 'Psychology', 'IT', 'Others'
  ];

  country = [
    'United Arab Emirates'
  ];

  city = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'AI Ain',
    'Ajman',
    'RAK City',
    'Fujairah',
    'Umm AI Quwain',
    'Khor Fakkan',
    'Kalba',
    'Jebel Ali',
    'Dibba AI-Fujairah',
    'Madinat Zayed',
    'Ruwais',
    'Liwa Oasis',
    'Dhaid',
    'Ghayathi',
    'Ar-Rams',
    'Dibba AI-Hisn',
    'Hatta',
    'AI Madam'
  ];

  nationality = [
    'India',
    'United Arab Emirates',
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua & Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas, The',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia & Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Is.',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burma',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Rep.',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Dem. Rep.',
    'Congo, Repub. of the',
    'Cook Islands',
    'Costa Rica',
    'Cote d Ivoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'Gabon',
    'Gambia, The',
    'Gaza Strip',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Fed. St.',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'N. Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Helena',
    'Saint Kitts & Nevis',
    'Saint Lucia',
    'St Pierre & Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome & Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad & Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks & Caicos Is',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Virgin Islands',
    'Wallis and Futuna',
    'West Bank',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];

  formGroup: FormGroup;
  passformat:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
  // emailformat: "/^\S+@\S*\.!(gmail.com|hotmail.com)$/";

  regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService) { }


    
  ngOnInit() {

    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      first_name: new FormControl(''),
      last_name: new FormControl('', Validators.required),
      referral_code: new FormControl(''),
      confirmpassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
      country: new FormControl(null, Validators.required),
      university: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      specialisation : new FormControl(null, Validators.required),
      terms_accepted: new FormControl(false, Validators.required),
      city:new FormControl(null, Validators.required),
      user_type: new FormControl('')
    });

    if (this.authService.isLoggedIn()) {
    this.router.navigateByUrl('/');
  }

    this.dropdownSettings = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: this.showAll,
    itemsShowLimit: 3,
    allowSearchFilter: this.ShowFilter
    };
  }

  handleReset() {
    this.myForm.get('city').setValue([]);
  }


  formGroupParticipant = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    referral_code: new FormControl(''),
    confirmpassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    country: new FormControl(null, Validators.required),
    terms_accepted: new FormControl(false , Validators.required),
    alert_info: new FormControl(false , Validators.required),
    city:new FormControl(null, Validators.required),
    heard_from:new FormControl(null, Validators.required),
    user_type: new FormControl('')
  });


  handleValidSubmitParticipant() {
    this.formGroupParticipant.value.user_type = "Participant";
    this.rest.registerUserParticipant(this.formGroupParticipant.value).subscribe((data: { Data:{ errors:any }, message: any}) => {
      if (data.message === 'user-registered') {
        this.toastr.success('An email has been sent on your registered email address... Please complete your verification!', 'Success');
        this.router.navigateByUrl('/pages/login-boxed');
      } else if(data.message === 'fields-not-filled'){
        this.errors = data.Data.errors;

        if (this.errors.country === 'not-selected') {
          $('#showmessagecountry1').css('display','block');
          document.getElementById("validationCountry1").classList.remove("ng-valid");
          document.getElementById("validationCountry1").classList.remove("is-valid");
          document.getElementById("validationCountry1").classList.add("ng-invalid");
          document.getElementById("validationCountry1").classList.add("is-invalid");
        }

        if (this.errors.city === 'not-selected') {
          $('#showmessageCity1').css('display','block');
          document.getElementById("validationcity1").classList.remove("ng-valid");
          document.getElementById("validationcity1").classList.remove("is-valid");
          document.getElementById("validationcity1").classList.add("ng-invalid");
          document.getElementById("validationcity1").classList.add("is-invalid");
        }

        if (this.errors.heard_from === 'not-selected') {
          $('#heardfrom').css('display','block');
          document.getElementById("validationheardfrom").classList.remove("ng-valid");
          document.getElementById("validationheardfrom").classList.remove("is-valid");
          document.getElementById("validationheardfrom").classList.add("ng-invalid");
          document.getElementById("validationheardfrom").classList.add("is-invalid");
        }

        if (this.errors.terms_accepted === 'not-selected' && this.errors.alert_info === 'not-selected') {

        }

        this.toastr.warning('Please fill the required fields', 'Warning');
        this.router.navigateByUrl('/pages/signup');

      } else if (data.message === 'already-exists') {
        this.toastr.warning('Email id already exists!', 'Warning');
        this.router.navigateByUrl('/pages/signup');

      }else if(data.message === 'pincode-miss-match'){
        this.toastr.warning('Pincode mismatch', 'Warning');
        this.router.navigateByUrl('/pages/signup');

      }else {
        this.toastr.error('An error occured while registering user!', 'Error');
        this.router.navigateByUrl('/pages/signup');
      }
    });
  }


  handleValidSubmitResearcher() {
    this.formGroup.value.user_type = "Researcher";
    this.rest.registerUserResearcher(this.formGroup.value).subscribe((data: { Data:{ errors:any }, message: any}) => {
      if (data.message === 'user-registered') {
        this.toastr.success('An email has been sent on your registered email address... Please complete your verification!', 'Success');
        this.router.navigateByUrl('/pages/login-boxed');
      } else if(data.message === 'fields-not-filled'){

        this.errors = data.Data.errors;

        if (this.errors.country === 'not-selected') {
          $('#showmessagecountry').css('display','block');
          document.getElementById("validationCountry").classList.remove("ng-valid");
          document.getElementById("validationCountry").classList.remove("is-valid");
          document.getElementById("validationCountry").classList.add("ng-invalid");
          document.getElementById("validationCountry").classList.add("is-invalid");
        }

        if (this.errors.city === 'not-selected') {
          $('#showmessagecity').css('display','block');
          document.getElementById("validationcity").classList.remove("ng-valid");
          document.getElementById("validationcity").classList.remove("is-valid");
          document.getElementById("validationcity").classList.add("ng-invalid");
          document.getElementById("validationcity").classList.add("is-invalid");
        }

        if (this.errors.job_type === 'not-selected') {
          $('#jobvalidation').css('display','block');
          document.getElementById("validationJob").classList.remove("ng-valid");
          document.getElementById("validationJob").classList.remove("is-valid");
          document.getElementById("validationJob").classList.add("ng-invalid");
          document.getElementById("validationJob").classList.add("is-invalid");
        }

        if (this.errors.specialisation === 'not-selected') {
          $('#specialisation').css('display','block');
          document.getElementById("validationspecialisation").classList.remove("ng-valid");
          document.getElementById("validationspecialisation").classList.remove("is-valid");
          document.getElementById("validationspecialisation").classList.add("ng-invalid");
          document.getElementById("validationspecialisation").classList.add("is-invalid");
        }

        if (this.errors.nationality === 'not-selected') {
          $('#nationality').css('display','block');
          document.getElementById("validationNationality").classList.remove("ng-valid");
          document.getElementById("validationNationality").classList.remove("is-valid");
          document.getElementById("validationNationality").classList.add("ng-invalid");
          document.getElementById("validationNationality").classList.add("is-invalid");
        }

        if (this.errors.department === 'not-selected') {
          $('#showmessagedepartment').css('display','block');
          document.getElementById("validationDepartment").classList.remove("ng-valid");
          document.getElementById("validationDepartment").classList.remove("is-valid");
          document.getElementById("validationDepartment").classList.add("ng-invalid");
          document.getElementById("validationDepartment").classList.add("is-invalid");
        }

        if (this.errors.terms_accepted === 'not-selected') {
        }

        this.toastr.warning('Please fill the required fields', 'Warning');
        this.router.navigateByUrl('/pages/signup');

      }else if (data.message === 'already-exists') {
        this.toastr.warning('Email id already exists!', 'Warning');
        this.router.navigateByUrl('/pages/signup');

      } else if(data.message === 'pincode-miss-match'){
        this.toastr.warning('Pincode mismatch', 'Warning');
        this.router.navigateByUrl('/pages/signup');

      } else {
        this.toastr.error('An error occured while registering user!','Error');
        this.router.navigateByUrl('/pages/signup');
      }
    });
  }


  

  emailValidation(){
    this.formGroupParticipant.value.email = this.formGroupParticipant.value.email;
    this.rest.emailValidate(this.formGroupParticipant.value).subscribe((data: { message: any}) => {
      if (data.message === 'valid-email') {
        $('#showmessageemail1').css('display','none');
        document.getElementById("emailvalidresearcher").classList.remove("ng-invalid");
        document.getElementById("emailvalidresearcher").classList.remove("is-invalid");
        document.getElementById("emailvalidresearcher").classList.add("ng-valid");
        document.getElementById("emailvalidresearcher").classList.add("is-valid");

      } else if(data.message === 'email-already-exist'){
        $('#showmessageemail1').css('display','block');
        document.getElementById("emailvalidresearcher").classList.remove("invalid-feedback");
        document.getElementById("emailvalidresearcher").classList.remove("ng-valid");
        document.getElementById("emailvalidresearcher").classList.remove("is-valid");
        document.getElementById("emailvalidresearcher").classList.add("ng-invalid");
        document.getElementById("emailvalidresearcher").classList.add("is-invalid");

      }else if(data.message === 'invalid-email'){
        document.getElementById("emailvalidresearcher").classList.remove("ng-valid");
        document.getElementById("emailvalidresearcher").classList.remove("is-valid");
        document.getElementById("emailvalidresearcher").classList.add("ng-invalid");
        document.getElementById("emailvalidresearcher").classList.add("is-invalid");
      }
    });
  }


  // researcher

  emailValidation1(){
    this.formGroup.value.email = this.formGroup.value.email;
    this.rest.emailValidate(this.formGroup.value).subscribe((data: { message: any}) => {
      if (data.message === 'valid-email') {
        $('#showmessageemail').css('display','none');
        document.getElementById("emailvalidparticipant").classList.remove("ng-invalid");
        document.getElementById("emailvalidparticipant").classList.remove("is-invalid");
        document.getElementById("emailvalidparticipant").classList.add("ng-valid");
        document.getElementById("emailvalidparticipant").classList.add("is-valid");

      } else if(data.message === 'email-already-exist'){

        $('#showmessageemail').css('display','block');
        // document.getElementById("emailvalidparticipant").classList.remove("invalid-feedback");
        document.getElementById("emailvalidparticipant").classList.remove("ng-valid");
        document.getElementById("emailvalidparticipant").classList.remove("is-valid");
        document.getElementById("emailvalidparticipant").classList.add("ng-invalid");
        document.getElementById("emailvalidparticipant").classList.add("is-invalid");

      }else if(data.message === 'invalid-email'){
        document.getElementById("emailvalidparticipant").classList.remove("ng-valid");
        document.getElementById("emailvalidparticipant").classList.remove("is-valid");
        document.getElementById("emailvalidparticipant").classList.add("ng-invalid");
        document.getElementById("emailvalidparticipant").classList.add("is-invalid");
      }
    });

  }


  validateCountry(){
    $('#showmessagecountry').css('display','none');
    document.getElementById("validationCountry").classList.remove("ng-invalid");
    document.getElementById("validationCountry").classList.remove("is-invalid");
    document.getElementById("validationCountry").classList.add("ng-valid");
    document.getElementById("validationCountry").classList.add("is-valid");
  }

  validateCity(){
    $('#showmessagecity').css('display','none');
    document.getElementById("validationcity").classList.remove("ng-invalid");
    document.getElementById("validationcity").classList.remove("is-invalid");
    document.getElementById("validationcity").classList.add("ng-valid");
    document.getElementById("validationcity").classList.add("is-valid");
  }

  validateCity1(){
    $('#showmessagecity1').css('display','none');
    document.getElementById("validationcity1").classList.remove("ng-invalid");
    document.getElementById("validationcity1").classList.remove("is-invalid");
    document.getElementById("validationcity1").classList.add("ng-valid");
    document.getElementById("validationcity1").classList.add("is-valid");
  }

  validateCountry1(){
    $('#showmessagecountry1').css('display','none');
    document.getElementById("validationCountry1").classList.remove("ng-invalid");
    document.getElementById("validationCountry1").classList.remove("is-invalid");
    document.getElementById("validationCountry1").classList.add("ng-valid");
    document.getElementById("validationCountry1").classList.add("is-valid");
  }

  hideerror() {
    $('.checkvalidation1').find(".invalid-feedback").hide();
  }

  validateHeardFrom(){
    $('#heardfrom').css('display','none');
    document.getElementById("validationheardfrom").classList.remove("ng-invalid");
    document.getElementById("validationheardfrom").classList.remove("is-invalid");
    document.getElementById("validationheardfrom").classList.add("ng-valid");
    document.getElementById("validationheardfrom").classList.add("is-valid");
  }

  specialisationValidation(){
    $('#specialisation').css('display','none');
    document.getElementById("validationspecialisation").classList.remove("ng-invalid");
    document.getElementById("validationspecialisation").classList.remove("is-invalid");
    document.getElementById("validationspecialisation").classList.add("ng-valid");
    document.getElementById("validationspecialisation").classList.add("is-valid");
  }

  jobValidation(){
    $('#jobvalidation').css('display','none');
    document.getElementById("validationJob").classList.remove("ng-invalid");
    document.getElementById("validationJob").classList.remove("is-invalid");
    document.getElementById("validationJob").classList.add("ng-valid");
    document.getElementById("validationJob").classList.add("is-valid");
  }

  nationalityValidation(){
    $('#nationality').css('display','none');
    document.getElementById("validationNationality").classList.remove("ng-invalid");
    document.getElementById("validationNationality").classList.remove("is-invalid");
    document.getElementById("validationNationality").classList.add("ng-valid");
    document.getElementById("validationNationality").classList.add("is-valid");
  }

  validateDepartment(){
    $('#showmessagedepartment').css('display','none');
    document.getElementById("validationDepartment").classList.remove("ng-invalid");
    document.getElementById("validationDepartment").classList.remove("is-invalid");
    document.getElementById("validationDepartment").classList.add("ng-valid");
    document.getElementById("validationDepartment").classList.add("is-valid");
  }


  validatePassword(){
    var password = (<HTMLInputElement>document.getElementById("password123")).value;
    var confirm_password = (<HTMLInputElement>document.getElementById("confirmpassword123")).value;
    this.rest.validatePassword(this.formGroupParticipant.value).subscribe((data: { message: any}) => {
      if( typeof(password) != null && (password) != "" && confirm_password === password && data.message == "Password-regex-match"){
        this.passwordmatch = true;
          document.getElementById("password123").classList.remove("ng-invalid");
          document.getElementById("password123").classList.remove("is-invalid");

          document.getElementById("password123").classList.add("ng-valid");
          document.getElementById("password123").classList.add("is-valid");

          document.getElementById("confirmpassword123").classList.remove("ng-invalid");
          document.getElementById("confirmpassword123").classList.remove("is-invalid");

          document.getElementById("confirmpassword123").classList.add("ng-valid");
          document.getElementById("confirmpassword123").classList.add("is-valid");

        } else {
          this.passwordmatch = false;
          document.getElementById("password123").classList.remove("ng-valid");
          document.getElementById("password123").classList.remove("is-valid");

          document.getElementById("confirmpassword123").classList.remove("ng-valid");
          document.getElementById("confirmpassword123").classList.remove("is-valid");

          document.getElementById("confirmpassword123").classList.add("ng-invalid");
          document.getElementById("confirmpassword123").classList.add("is-invalid");
        }

        if(data.message == "Password-regex-match"){
          $('#showmessagepassword').css('display','none');
          $('#showmessageconfirmpassword').css('display','none');
        }else{
          $('#showmessagepassword').css('display','block');
        }
    });
  }


 validateConfirmPassword(){
    var confirm_password = (<HTMLInputElement>document.getElementById("confirmpassword123")).value;
    var password = (<HTMLInputElement>document.getElementById("password123")).value;

    this.rest.validatePassword(this.formGroupParticipant.value).subscribe((data: { message: any}) => {
      if( confirm_password === password && data.message == "Password-regex-match"){
        this.passwordmatch = true;

          document.getElementById("confirmpassword123").classList.remove("ng-invalid");
          document.getElementById("confirmpassword123").classList.remove("is-invalid");

          document.getElementById("confirmpassword123").classList.add("ng-valid");
          document.getElementById("confirmpassword123").classList.add("is-valid");

          document.getElementById("password123").classList.add("ng-valid");
          document.getElementById("password123").classList.add("is-valid");


        } else {
          this.passwordmatch = false;
          document.getElementById("confirmpassword123").classList.remove("ng-valid");
          document.getElementById("confirmpassword123").classList.remove("is-valid");

          document.getElementById("confirmpassword123").classList.add("ng-invalid");
          document.getElementById("confirmpassword123").classList.add("is-invalid");

        }
      });
  }


  //  researcher

 validatePassword1(){
    var password = (<HTMLInputElement>document.getElementById("password1234")).value;
    var confirm_password = (<HTMLInputElement>document.getElementById("confirmpassword1234")).value;
    this.rest.validatePassword(this.formGroup.value).subscribe((data: { message: any}) => {

        if( typeof(password) != null && (password) != "" && confirm_password === password && data.message == "Password-regex-match"){
          this.passwordmatch = true;

          document.getElementById("password1234").classList.remove("ng-invalid");
          document.getElementById("password1234").classList.remove("is-invalid");

          document.getElementById("password1234").classList.add("ng-valid");
          document.getElementById("password1234").classList.add("is-valid");

          document.getElementById("confirmpassword1234").classList.remove("ng-invalid");
          document.getElementById("confirmpassword1234").classList.remove("is-invalid");

          document.getElementById("confirmpassword1234").classList.add("ng-valid");
          document.getElementById("confirmpassword1234").classList.add("is-valid");

        } else {
          this.passwordmatch = false;
          document.getElementById("password1234").classList.remove("ng-valid");
          document.getElementById("password1234").classList.remove("is-valid");

          document.getElementById("confirmpassword1234").classList.remove("ng-valid");
          document.getElementById("confirmpassword1234").classList.remove("is-valid");

          document.getElementById("confirmpassword1234").classList.add("ng-invalid");
          document.getElementById("confirmpassword1234").classList.add("is-invalid");
        }

        if(data.message == "Password-regex-match"){
          $('#showmessageresearcherpassword').css('display','none');
          $('#showmessageresearcherconfirmpassword').css('display','none');

        }else{
          $('#showmessageresearcherpassword').css('display','block');
        }
    });

    }


  validateConfirmPassword1(){
    var confirm_password = (<HTMLInputElement>document.getElementById("confirmpassword1234")).value;
    var password = (<HTMLInputElement>document.getElementById("password1234")).value;

    this.rest.validatePassword(this.formGroupParticipant.value).subscribe((data: { message: any}) => {
    if( confirm_password === password && data.message == "Password-regex-match"){
      this.passwordmatch = true;
        document.getElementById("confirmpassword1234").classList.remove("ng-invalid");
        document.getElementById("confirmpassword1234").classList.remove("is-invalid");

        document.getElementById("confirmpassword1234").classList.add("ng-valid");
        document.getElementById("confirmpassword1234").classList.add("is-valid");

        document.getElementById("password1234").classList.add("ng-valid");
        document.getElementById("password1234").classList.add("is-valid");

      } else {
        this.passwordmatch = false;
        document.getElementById("confirmpassword1234").classList.remove("ng-valid");
        document.getElementById("confirmpassword1234").classList.remove("is-valid");

        document.getElementById("confirmpassword1234").classList.add("ng-invalid");
        document.getElementById("confirmpassword1234").classList.add("is-invalid");

      }
    });
  }

}
