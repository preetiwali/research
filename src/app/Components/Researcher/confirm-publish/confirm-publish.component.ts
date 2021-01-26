import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import {ApiService} from './../../../api.service';
import { ToastrService } from 'ngx-toastr';
import {environment} from './../../../../environments/environment';
import {Color} from 'ng2-charts/ng2-charts';
import {MatChipInputEvent} from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-publish',
  templateUrl: './confirm-publish.component.html',
  styleUrls: ['./confirm-publish.component.sass']
})
export class ConfirmPublishComponent implements OnInit {

  study:any;
  study_id:any;
  transactions:any;
  formGroup: FormGroup;
  closeResult: string;
  filteredCandidateCount:any;
  percentageValue: (value: number) => string;

  gaugeValues: any = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50
  };


  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder,private toastr: ToastrService, private modalService: NgbModal) { }


  ngOnInit() {

    this.formGroup = new FormGroup({
      term1: new FormControl('', Validators.required),
      term2: new FormControl('', Validators.required),
      term3: new FormControl('', Validators.required),
      term4: new FormControl('', Validators.required),
      term5: new FormControl('', Validators.required),
      term6: new FormControl('', Validators.required),
      term7: new FormControl('', Validators.required),
      term8: new FormControl('', Validators.required),
      term9: new FormControl('', Validators.required),
      term10: new FormControl('')
      
    });

    this.study_id = this.route.snapshot.params['id']
    this.getStudyInfo(this.route.snapshot.params['id']); 
  }
    
  shoeModal(value){
    alert(value);
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

  getStudyInfo(id) {
    this.rest.getStudyInfo(id).subscribe((data: { message:any, Data: { study:any ,transactions:any, filtered_candidates_count:any} }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.study = data.Data.study;
        this.filteredCandidateCount = data.Data.filtered_candidates_count;
        this.transactions = data.Data.transactions;
      }
    });
  }

 confirmStudy(id)
  {
    this.rest.confirmStudy(id).subscribe((data: { message: any }) => {
      if (data.message == 'study-published') {
      this.toastr.success('Waiting for admin approval', 'Success!');
      this.router.navigateByUrl('/unpublishedstudy');
    } else {
      this.toastr.error('Study not Published', 'Oops!');
      this.router.navigateByUrl('/confirmpublish/' +this.study_id);
      }
      });
  }

}
