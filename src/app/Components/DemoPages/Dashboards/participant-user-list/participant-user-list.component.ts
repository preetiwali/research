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
  selector: 'app-participant-user-list',
  templateUrl: './participant-user-list.component.html',
  styleUrls: ['./participant-user-list.component.sass']
})
export class ParticipantUserListComponent implements OnInit {

  participantusers: any;
  user: any;
  status: any;
  term:any;
  config: any;
 
  constructor(private authService: AuthService, public rest: ApiService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,private toastr: ToastrService) 
    {

      // for (var i = 0; i < this.participantusers; i++) {
      //   this.participantusers.data.push(
      //     {
      //       id: i + 1,
      //       value: "items number " + (i + 1)
      //     }
      //   );
      // }
    
      // this.config = {
      //   itemsPerPage: 14,
      //   currentPage: 1,
      //   totalItems: this.participantusers
      // };
    }
    
    // pageChanged(event){
    //   this.config.currentPage = event;
    // }

  ngOnInit() {
    
    this.getParticipantUsers();
  }

  getParticipantUsers() {
    this.rest.getAllParticipant().subscribe((data: {message:any, Data:any }) => {
      if(data.message == 'unauthorised-user'){
        this.router.navigateByUrl('/');
      }else{
        this.participantusers = data.Data;
      }
      
    });
  }

}
