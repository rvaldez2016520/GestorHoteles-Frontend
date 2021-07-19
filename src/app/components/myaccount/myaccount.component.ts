import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CONNECTION } from '../../services/global';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyAccountComponent implements OnInit {
  public user:User;
  public token;
  public possiblePass;
  public uri:string;

  constructor(private restUser: RestUserService,
              private router: Router) { 
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {}

  onSubmit(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated));
        alert (res.message);
      }else{
        alert(res.message);
        this.user = this.restUser.getUser();
      }
    },
    err => alert(err.error.message))
  }

  deleteUser(){
    this.restUser.deleteUser(this.user._id,this.possiblePass).subscribe((res:any)=>{
      if(!res.userRemoved){
        alert(res.message)
      }else{
        alert(res.message)
        localStorage.clear();
        this.router.navigateByUrl('home');
      }
    },
    error => alert(error.error.message))
}

}
