import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user:User;
  message;
  username:string;

  constructor(private userService:RestUserService) { 
    this.user = new User("", "", "", "", "", "", "", [], [], []);
  }

  ngOnInit(): void {
  }

  onSubmit(register){
    this.userService.register(this.user).subscribe((res:any)=>{ 
      this.message = res.message;
      if(res.userSaved){
        alert(this.message);
        register.reset();
      }else{
        alert(this.message)
      }
    });
  }

}
