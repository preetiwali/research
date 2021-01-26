import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import {ApiService} from './../../../../api.service';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Observable, interval, Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-adddetailsresearcherfirstpage',
  templateUrl: './adddetailsresearcherfirstpage.component.html',
  styleUrls: ['./adddetailsresearcherfirstpage.component.sass']
})
export class AdddetailsresearcherfirstpageComponent implements OnInit {

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal) { }

  htmlContent = '';
  closeResult: string;
  selectedFile:any;
  image_url:any;
  contentList:any;
  page_id:any;
  image_url_id:any;


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
    this.page_id = this.route.snapshot.params['id']
    this.getContent(this.page_id);
  }

  basicdetails = new FormGroup({
    content: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    content_type: new FormControl('', Validators.required)
  });

  uploadImage  =  new FormGroup({
    image_url: new FormControl('')
  });

  editcontent = new FormGroup({
    content: new FormControl('', Validators.required),
    title: new FormControl('')
  });

  getContent(id) {
    this.rest.getContent(id).subscribe((data: { message:any , Data:{content:any } }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.contentList = data.Data;
      }
    });
  }


  editContent(id) {
    this.rest.editContent(id,this.editcontent.value).subscribe((data: { message: any }) => {
      if (data.message == 'page-updated') {
          $(".close").click();
          this.getContent(this.page_id);
          this.toastr.success('Content Updated', 'Success!');
          this.router.navigateByUrl('/dashboards/addfirstpagedetails/' + this.page_id);
      } else {
        this.getContent(this.page_id);
        this.toastr.error('Content is not Updated', 'Oops!');
        this.router.navigateByUrl('/dashboards/addfirstpagedetails/' + this.page_id);
      }
    });
  }


  addBasicDetails(){
    this.basicdetails.value.page_id = this.page_id;
    this.rest.addBasicDetails(this.basicdetails.value).subscribe((data: { message: any, Data: any }) => {
      if (data.message == 'page-saved') {
        $(".close").click();
        this.getContent(this.page_id);
        this.basicdetails.reset();
        this.toastr.success('Content Saved', 'Success!');
        this.router.navigateByUrl('/dashboards/addfirstpagedetails/'+ this.page_id);
      } else {
        this.getContent(this.page_id);
        this.toastr.error('Content not saved', 'Oops!');
        this.router.navigateByUrl('/dashboards/addfirstpagedetails/' + this.page_id);
      }
    });
  }


  onFileChange($event) {
    this.selectedFile = $event.target.files[0];
    this.uploadImage.controls['image_url'].setValue(this.selectedFile ? this.selectedFile : '');
  }


  updateImage(id) {
    const user_id = localStorage.getItem('user_id');
      const fd = new FormData();
    $('.user_id_proof_img').removeClass('display_none');
      // this.updateProfileImageForm.value
        if(this.selectedFile != null)
        {
          fd.append('file', this.selectedFile, this.selectedFile.name);
          this.rest.updatefirstpageImage(fd,id).subscribe((data: { message: any }) => {
            if (data.message === 'image-updated') {
              this.uploadImage.reset();
              $(".close").click();
              this.getContent(this.page_id);
              this.toastr.success('Image updated', 'Success!');
              this.router.navigateByUrl('/dashboards/addfirstpagedetails/'+ this.page_id);
            } else {
              this.getContent(this.page_id);
              $(".close").click();
              this.toastr.error('An error occured while updating image', 'Oops!');
              this.router.navigateByUrl('/dashboards/addfirstpagedetails/'+ this.page_id);
            }
          });
        }
        else
        {
          this.toastr.error('Please select an image', 'Oops!');
        }
  }

  deleteContent(id){
    this.rest.deleteContentInfo(id).subscribe((data: { message: any }) => {
      if (data.message == 'page-deleted') {
        $(".close").click();
        this.getContent(this.page_id);
        this.toastr.success('Content Deleted', 'Success!');
        this.router.navigateByUrl('/dashboards/addfirstpagedetails/' + this.page_id);
      } else {
        $(".close").click();
        this.getContent(this.page_id);
        this.toastr.error('Content not Deleted', 'Oops!');
        this.router.navigateByUrl('/dashboards/addfirstpagedetails/' + this.page_id);
      } 
    });
  }

}
