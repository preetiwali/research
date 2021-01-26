import {Component, OnInit} from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../user';
import {ApiService} from './../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from './../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-researcher-help-faq',
  templateUrl: './researcher-help-faq.component.html',
  styleUrls: ['./researcher-help-faq.component.sass']
})
export class ResearcherHelpFAQComponent implements OnInit {

  panelOpenState = false;
  isDisabled = true;
  step = 0;
  closeResult: string;
  faq:any;
  selectedFile:any;
  image_url:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal) { }

  
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


  ngOnInit() {
    this.getHelpFAQ();
  }

  addhelpquestion = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    user_type:new FormControl('')
  });


  edithelpquestion = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required)
  });

  uploadImage  =  new FormGroup({
    file: new FormControl('')
  });

  orderfaq = new FormGroup({
    order_number: new FormControl('', Validators.required)
  });


  getHelpFAQ() {
    this.rest.getResearcherHelpFAQ().subscribe((data: { message:any, Data: { question_categories:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.faq = data.Data;
      }
      
    });
  }


  orderResearcherFAQ(id) {
    this.rest.editHelpQuestion(this.orderfaq.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'faq-updated') {
          $(".close").click();
          this.getHelpFAQ();
          this.toastr.success('Order Updated', 'Success!');
          this.router.navigateByUrl('/researcherhelpFAQ');
      } else {
        this.getHelpFAQ();
        this.toastr.error('Order is not Updated', 'Oops!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      }
    });
  }
  

  addHelpQuestions() {
    this.addhelpquestion.value.user_type = 'Researcher';
    this.rest.addHelpQuestion(this.addhelpquestion.value).subscribe((data: { message: any }) => {
      if (data.message === 'faq-saved') {
        $(".close").click();
        this.getHelpFAQ();
        this.addhelpquestion.reset();
        this.toastr.success('Question and answer has been saved ', 'Success!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      } else {
        this.toastr.error('An error occured while adding question and answer', 'Oops!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      }
    }); 
  }

  editHelpQuestion(id) {
    this.rest.editHelpQuestion(this.edithelpquestion.value, id).subscribe((data: { message: any, id: any }) => {
      if (data.message == 'faq-updated') {
          $(".close").click();
          this.getHelpFAQ();
          this.toastr.success('Question Updated', 'Success!');
          this.router.navigateByUrl('/researcherhelpFAQ');
      } else {
        this.toastr.error('Question is not Updated', 'Oops!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      }
    });
  }

  deleteFAQQuestions(id){
    this.rest.deleteFAQQuestions(id).subscribe((data: { message: any }) => {
      if (data.message == 'faq-deleted') {
        $(".close").click();
        this.getHelpFAQ();
        this.toastr.success('FAQ image Deleted', 'Success!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      } else {
        $(".close").click();
        this.toastr.error('FAQ image not Deleted', 'Oops!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      } 
    });
  }

  
  deleteFAQImage(id){
    this.rest.deleteFAQImage(id).subscribe((data: { message: any }) => {
      if (data.message == 'faq-image-deleted') {
        $(".close").click();
        this.getHelpFAQ();
        this.toastr.success('Question Deleted', 'Success!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      } else {
        $(".close").click();
        this.toastr.error('Question not Deleted', 'Oops!');
        this.router.navigateByUrl('/researcherhelpFAQ');
      } 
    });
  }


  onFileChange($event) {
    this.selectedFile = $event.target.files[0]; // <--- File Object for future use.
    this.uploadImage.controls['file'].setValue(this.selectedFile ? this.selectedFile : ''); // <-- Set Value for Validation
  }


  updateResearcherFaqImage(id) {
    const user_id = localStorage.getItem('user_id');
      const fd = new FormData();
    $('.user_id_proof_img').removeClass('display_none');
      // this.updateProfileImageForm.value
        if(this.selectedFile != null)
        {
          fd.append('file', this.selectedFile, this.selectedFile.name);
          this.rest.updateResearcherFaqImage(fd,id).subscribe((data: { message: any }) => {
            if (data.message === 'faq-image-updated') {
              $(".close").click();
              this.getHelpFAQ();
              this.toastr.success('Image updated', 'Success!');
              this.router.navigateByUrl('/researcherhelpFAQ');
            } else {
              $(".close").click();
              this.getHelpFAQ();
              this.toastr.error('An error occured while upload image', 'Oops!');
              this.router.navigateByUrl('/researcherhelpFAQ');
            }
          });
        }
        else
        {
          this.toastr.error('Please select an image', 'Oops!');
        }
  }
}
