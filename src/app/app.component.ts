import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'ArchitectUI - Angular 7 Bootstrap 4 & Material Design Admin Dashboard Template';
}

// user : any;
//   user_type:any;
//   login_count:any;

//   constructor(private authService: AuthService, public rest: ApiService , private router: Router,private route: ActivatedRoute) {
//   }

//   ngOnInit() {
//     this.getUserInfo(); 
//   }

//   getUserInfo() {
//     const user_id = localStorage.getItem('user_id');
//     this.rest.getUserInfo(user_id).subscribe((data: {message:any, Data: { user:{ login_count:any } } }) => {
//     if (data.message === 'user-info') {
//       this.user = data.Data.user;
//       this.user_type = this.user.user_type;
//       console.log(this.user_type);
//       if(this.user_type == 'Researcher'){

//         $(".globalClass_9da").show();

//       }else{
//         $(".globalClass_9da").hide();

//       }
//     } 
//   });
//  }