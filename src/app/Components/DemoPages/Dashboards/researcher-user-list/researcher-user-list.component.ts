import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../api.service';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './../../../../user';
import { AuthService } from './../../../../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-researcher-user-list',
  templateUrl: './researcher-user-list.component.html',
  styleUrls: ['./researcher-user-list.component.sass']
})
export class ResearcherUserListComponent implements OnInit {

  researcherusers: any;
  user: any;
  status: any;
  config: any;
  term:any;

  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService)
    {

      //Create dummy data
      // for (var i = 0; i < this.researcherusers; i++) {
      //   this.researcherusers.data.push(
      //     {
      //       id: i + 1,
      //       value: "items number " + (i + 1)
      //     }
      //   );
      // }
    
      // this.config = {
      //   itemsPerPage: 14,
      //   currentPage: 1,
      //   totalItems: this.researcherusers
      // };
    }
    
    // pageChanged(event){
    //   this.config.currentPage = event;
    // }

  ngOnInit() {
    this.getResearcherUsers();
  }

  getResearcherUsers() {
    this.rest.getAllResearche().subscribe((data: {message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.researcherusers = data.Data;
      }
      
    });
  }

}
