import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  token:string;
  userLogged;

  constructor(private restUser:RestUserService, private router: Router) {
    this.user = new User("", "", "", "", "", "", "", [], [], []);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      if(!res.token){
        alert(res.message);
      }else{
        this.token = res.token;
        this.userLogged = res.userFinded;
        delete this.userLogged.password;
        if(this.token.length <= 0){
          alert('El token no se generó o capturó de manera correcta.')
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(res.userFinded));
          localStorage.setItem('role', this.userLogged.role);
          alert('Usuario logeado exitosamente.');
          if(this.userLogged.role == "ROLE_ADMIN"){
            this.router.navigateByUrl('homeAdmin');
          }else if(this.userLogged.role == "ROLE_HOTEL"){
            localStorage.setItem('hotel', JSON.stringify(res.hotelFound) );
            this.router.navigateByUrl('homeAdmin');
          }else if(this.userLogged.role == "ROLE_CLIENT"){
            this.router.navigateByUrl('home')
          }
        }
      }
    },
    (error:any) => console.log(<any>error)
    )
  }


}