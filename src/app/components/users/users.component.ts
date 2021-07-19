import { Component, OnInit, DoCheck } from '@angular/core';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, DoCheck {
  user: User;

  userAdmin: User;
  users: [] = [];
  roles: Array<String> = ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_HOTEL"];

  username: String = null;
  name: String = null;
  lastname: String = null;
  role: String = null

  constructor(private restUser: RestUserService) { 
    this.user = new User("", "", "", "", "", "", "", [], [], []);
  }

  ngOnInit(){
    this.restUser.getUsers().subscribe((resp: any) => {
      this.users = resp.users;
    });
    this.userAdmin = this.restUser.getUser();
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  ngDoCheck(){
    this.userAdmin = this.restUser.getUser();
  }

  setUserDetail(user:any){
    this.username = user.username;
    this.name = user.name;
    this.lastname = user.lastname;
    this.role = user.role;
  }

  onSubmit(saveUserByAdminForm){
    console.log(this.user);
    this.restUser.saveUserByAdmin(this.user).subscribe( (resp:any) => {
      if(resp.userSaved){
        alert(resp.message);
        saveUserByAdminForm.reset();
        this.users = resp.users;
        localStorage.setItem("users", JSON.stringify(this.users));
      }else {
        alert(resp.message);
      }
    }, 
    err => alert(err.error.message));
  }

}
