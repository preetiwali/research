import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../api.service';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../user';
import { AuthService } from './../../../auth.service';
import * as $ from 'jquery';
import { Observable, interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.sass']
})
export class AddQuestionsComponent implements OnInit {

  addquestions = new FormGroup({
    question_category_id: new FormControl('', Validators.required),
    question_type_id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute ,private toastr: ToastrService) { }

  ngOnInit() {
  }

  addQuestions() {
    this.rest.addQuestions(this.addquestions.value).subscribe((data: { message: any }) => {
      if (data.message === 'question-saved') {
        this.toastr.success('Question added successfully!', 'Success!');
        this.router.navigateByUrl('/category-questions');
      } else if (data.message === 'already-exists') {
        this.toastr.success('Question already exists', 'Success!');
        this.router.navigateByUrl('/category-questions');
      } else {
        this.toastr.error('An error occured while adding Question', 'Oops!');
        this.router.navigateByUrl('/category-questions');
      }
    }); 
  }
}
